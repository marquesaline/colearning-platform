const controller = {}

const create = require("../utils/create")
const { User, Agenda, Event, BusinessHours, Contact } = require("../database/models")
const { getAllUsers, getUser, getUserAgendas, getUserEvents, getUserByEmail } = require('../services/users')
const { getAllAgendas, getAgenda, getEventsAgendas, getBusinessHours } = require('../services/agendas')
const { getAllEvents, getEvent } = require('../services/events')
const { getAllContacts, getContact } = require("../services/contacts")
const { validationResult } = require('express-validator')
const bcrypt  = require('bcrypt')

//ADMIN DASHBOARD
controller.index = async (req, res) => {
    const userLogged = await req.session.userLogged
    const userLogin = await getUser(userLogged.id)
    const users = await getAllUsers()
    const agendas = await getAllAgendas()
    const events = await getAllEvents()
    const contacts = await getAllContacts()
    res.render("admin/admin-index", { 
        title: "Dashboard Admin",
        userLogin,
        users,
        agendas,
        events,
        contacts
   })
}

//ADMIN USUÁRIOS
controller.users = async (req, res) => {
    const userLogged = await req.session.userLogged
    const userLogin = await getUser(userLogged.id)
    const users = await getAllUsers();
    res.render('admin/lista', {
      title: "Usuários",
      users,
      userLogin
    });
},

controller.addUser = async (req, res) => {
    const userLogged = await req.session.userLogged
    const userLogin = await getUser(userLogged.id)
    const users = await getAllUsers()
    res.render('admin/adicionar', {
      title: "Adicionar usuário",
      userLogin, 
      users
    });
},

controller.createUser = async (req, res) => {
    //validação dos campos
    const resultValidations = validationResult(req)

    if(resultValidations.errors.length > 0 ) {
      
      return res.render('admin/adicionar', {
        title: "Adicionar usuário",
        errors: resultValidations.mapped(),
        oldData: req.body
      })
    } 
    
    const { nome, email, senha, admin, avatar, created_at, updated_at } = req.body
    let avatarFileName = avatar
   
    if(req.file != undefined) {
        avatarFileName = req.file.filename;
    }

    //conferir se já existe um email
    let emailExists = await getUserByEmail(email)
    if(emailExists) {
      res.render('admin/adicionar', {
        title: "Adicionar usuário",
        errors: {
          email: {
            msg: 'Este email já está cadastrado'
          }
        },
        oldData: req.body
      })
    } 

    const slug = await create.slug(nome)
    //criptografia da senha
    let senhaCripto = bcrypt.hashSync(senha, 3)
    
    
    await User.create({
      nome, 
      senha: senhaCripto,
      email, 
      slug,
      avatar: avatarFileName || null, 
      admin: !!admin,
      createdAt: created_at, 
      updatedAt: updated_at
    });
    res.redirect("/admin/usuarios");
},

controller.editUser = async (req, res) => {
    const { id } = req.params
    const user = await getUser(id)
    res.render('admin/editar', {
      title: "Editar usuário",
      user,
    });
},

controller.updateUser = async (req, res) => {
    const { id } = req.params
    const user = getUser(id)
    const resultValidations = validationResult(req)

    if(resultValidations.errors.length > 0 ) {
     
      return res.render('admin/usuario-editar', {
        title: `Editar usuário - ${user.nome}`,
        errors: resultValidations.mapped(),
        oldData: req.body,
        user
      })
    } 
    
    const { 
        nome, 
        slug, 
        email, 
        senha, 
        avatar,
        admin, 
        created_at, 
        updated_at 
    } = req.body
    let avatarFileName = avatar
   
    if(req.file != undefined) {
        avatarFileName = req.file.filename;
    }
    console.log(avatarFileName)

    let senhaCripto = bcrypt.hashSync(senha, 3)
    
    await User.update(
    {
      nome, 
      slug,
      email, 
      senha: senhaCripto,
      avatar: avatarFileName || null, 
      admin: !!admin,
      createdAt: created_at, 
      updatedAt: updated_at
    }, 
    { where: {id}})  
    res.redirect(`/admin/usuarios/${id}`);
},

controller.excludeUser = async (req, res) => {
    const { id } = req.params
    const user = await getUser(id)
    res.render("admin/excluir", {
      title: "Excluir Usuário",
      user
    });
},

controller.deleteUser = async (req, res) => {
    const { id } = req.params
    await User.destroy({
      where: { id }
    })
    res.redirect(`/admin/usuarios`);
},

controller.showUser = async (req, res) => {
    const { id } = req.params
    const user = await getUser(id)
    res.render("admin/mostrar", {
      title: "Usuário",
      user
    });
},
controller.showUserAgendas = async (req, res) => {
    const { id } = req.params
    const user = await getUser(id)
    const agendas = await getUserAgendas(id)
    res.render("admin/lista", {
      title: `Agendas - ${ user.nome }`,
      user,
      agendas
    })
},
controller.showUserEvents = async (req, res) => {
    const { id } = req.params
    const user = await getUser(id)
    const events = await getUserEvents(id)
    res.render("admin/lista", {
      title: `Agendamentos - ${ user.nome }`,
      user,
      events
    })
}

//ADMIN AGENDAS
controller.adminAgendas = async (req, res) => {
    const userLogged = await req.session.userLogged
    const userLogin = await getUser(userLogged.id)
    const agendas = await getAllAgendas()
    res.render("admin/lista", {
        title: "Agendas",
        agendas,
        userLogin
    })
}
controller.adminAddAgenda = async (req, res) => {
    const userLogged = await req.session.userLogged
    const userLogin = await getUser(userLogged.id)
    const agendas = await getAllAgendas()
    res.render("admin/adicionar", {
        title: "Adicionar agenda",
        agendas,
        userLogin
    })
}
controller.createAgenda = async (req, res) => {
    const  { 
        userId, 
        title, 
        url, 
        duration, 
        start, 
        end, 
        daysOfWeek, 
        startTime, 
        endTime, 
        created_at, 
        updated_at 
    } = await req.body;
    console.log(daysOfWeek.length)
    console.log(startTime)
    console.log(endTime)
    let start_time =  create.time(startTime)
    console.log(start_time)
    let end_time = create.time(endTime)
    const backgroundColor = await create.color()
    const response = await Agenda.create({
        userId, 
        title, 
        url, 
        duration,
        start, 
        end,
        backgroundColor, 
        createdAt: created_at, 
        updatedAt: updated_at        
    })
    let days_of_week = daysOfWeek
    console.log(days_of_week)
    console.log(days_of_week.length)
 
    for(i = 0; i <= days_of_week.length; i++) {
        await BusinessHours.create(
            {
                agendaId: response.id,
                daysOfWeek: days_of_week[i],
                startTime: start_time[i],
                endTime: end_time[i],
                createdAt: created_at,
                updatedAt: updated_at
            },
            
        )
    }  
    res.redirect("/admin/agendas")
} 

controller.showAgenda = async (req, res) => {
    const userLogged = await req.session.userLogged
    const userLogin = await getUser(userLogged.id)
    const { id } = req.params
    const agenda = await getAgenda(id)
    let businessHours = await create.businessHours(await getBusinessHours(id))
    businessHours = JSON.parse(businessHours)
    res.render("admin/mostrar", {
        title: "Agenda",
        agenda,
        businessHours,
        userLogin

    })
}

controller.showAgendaEvents = async (req, res) => {
    const userLogged = await req.session.userLogged
    const userLogin = await getUser(userLogged.id)
    const { id } = req.params
    const agenda = await getAgenda(id)
    const events = await getEventsAgendas(id)
    res.render("admin/lista", {
        title: `Agendamentos - ${agenda.title}`,
        agenda, 
        events,
        userLogin
    })
}

controller.editAgenda = async (req, res) => {
    const userLogged = await req.session.userLogged
    const userLogin = await getUser(userLogged.id) 
    const { id } = req.params
    const agenda = await getAgenda(id)
    const businessHours = 
        await create.businessHours(await getBusinessHours(id))

    res.render("admin/editar", {
        title: "Editar agenda",
        agenda, 
        businessHours,
        userLogin
    })
}
controller.updateAgenda = async (req, res) =>{
    const { id } = req.params
    const agenda = getAgenda(id)

    const {
        userId, 
        title, 
        url, 
        duration, 
        start,
        end, 
        daysOfWeek, 
        startTime, 
        endTime, 
        created_at, 
        updated_at
    } =req.body

    backgroundColor = agenda.backgroundColor
    await Agenda.update({
        userId, 
        title, 
        url, 
        duration, 
        start, 
        end, 
        backgroundColor,
        createdAt: created_at, 
        updatedAt: updated_at
    }, { where: { id }})

    let start_time = create.time(startTime)
    let end_time = create.time(endTime)

    await BusinessHours.destroy({ where: {agendaId: id}})
    for(i = 0; i < daysOfWeek.length; i++) {
        
        await BusinessHours.create(
            {
                agendaId: id,
                daysOfWeek: daysOfWeek[i],
                startTime: start_time[i],
                endTime: end_time[i],
                createdAt: created_at,
                updatedAt: updated_at
            }   
        )
    }
    res.redirect(`/admin/agendas/${id}`)
}

controller.excludeAgenda = async(req, res) => {
    const userLogged = await req.session.userLogged
    const userLogin = await getUser(userLogged.id)
    const { id } = req.params
    const agenda = await getAgenda(id)
    res.render("admin/excluir", {
        title:"Excluir agenda",
        agenda, 
        userLogin
    })
}
controller.deleteAgenda = async (req, res) => {
    const { id } = req.params
    await Agenda.destroy({
        where: { id }
    })
    res.redirect("/admin/agendas")
}

//ADMIN AGENDAMENTOS
controller.adminEvents = async (req, res) => {
    const userLogged = await req.session.userLogged
    const userLogin = await getUser(userLogged.id)
    const events = await getAllEvents()
    res.render("admin/lista", {
        title: "Agendamentos",
        events,
        userLogin
    })
}
controller.adminAddEvent = async(req, res) => {
    const userLogged = await req.session.userLogged
    const userLogin = await getUser(userLogged.id)
    const events = await getAllEvents()
    res.render("admin/adicionar", {
        title: "Adicionar agendamento", 
        events, 
        userLogin
    })
}
controller.createEvent = async (req, res) => {
    const {
        userId,
        agendaId,
        title,
        start,
        startTime,
        emailAluno,
        telefoneAluno, 
        description,               
        created_at,
        updated_at
    } = req.body;    
    const agenda = await getAgenda(agendaId)
    const endTime = await create.endTime(start, startTime, agenda.duration)
    await Event.create({
        userId,
        agendaId,
        title,
        start,
        end: start,
        startTime,
        endTime: endTime,
        backgroundColor: agenda.backgroundColor,
        url: agenda.url,
        emailAluno,
        telefoneAluno,
        description,
        allDay: false,
        createdAt: created_at,
        updatedAt: updated_at
                
    });
    res.redirect("/admin/agendamentos")
}
controller.showEvent = async (req, res) => {
    const userLogged = await req.session.userLogged
    const userLogin = await getUser(userLogged.id)
    const { id } = req.params
    const event = await getEvent(id)
    res.render("admin/mostrar", {
        title: `Agendamento de ${event.title}`,
        event, 
        userLogin
    })
}
controller.editEvent = async (req, res) => {
    const userLogged = await req.session.userLogged
    const userLogin = await getUser(userLogged.id)
    const { id } = req.params
    const event = await getEvent(id)

    res.render("admin/editar", {
        title: "Editar agendamento",
        event, 
        userLogin
    })
}

controller.updateEvent = async (req, res) =>{
    const { id } = req.params
    const {
        userId,
        agendaId,
        title,
        emailAluno,
        telefoneAluno,
        start,
        startTime,
        description,
        created_at,
        updated_at
    } =req.body
    const agenda = await getAgenda(agendaId)
    const endTime = await create.endTime(start, startTime, agenda.duration)
    await Event.update({
        userId,
        agendaId,
        title, 
        start,
        end: start,
        startTime,
        endTime: endTime,
        backgroundColor: agenda.backgroundColor,
        url: agenda.url,
        emailAluno,
        telefoneAluno,
        description,
        createdAt: created_at,
        updatedAt: updated_at
    },
    {
        where: {id}
    })    
    res.redirect('/admin/agendamentos')
}

controller.excludeEvent = async(req, res) => {
    const userLogged = await req.session.userLogged
    const userLogin = await getUser(userLogged.id)
    const { id } = req.params
    const event = await getEvent(id)
    res.render("admin/excluir", {
        title:"Excluir agendamento",
        event,
        userLogin
    })
}
controller.deleteEvent = async (req, res) => {
    const { id } = req.params
    await Event.destroy({
        where: { id }
    })
  
    res.redirect("/admin/agendamentos")
}

//ADMIN CONTATOS
controller.adminContacts = async (req, res) => {
    const userLogged = await req.session.userLogged
    const userLogin = await getUser(userLogged.id)
    const contacts = await getAllContacts()
    res.render("admin/lista", {
        title: "Contatos",
        contacts,
        userLogin
    })
}
controller.showContact = async (req, res) => {
    const userLogged = await req.session.userLogged
    const userLogin = await getUser(userLogged.id)
    const { id } = req.params
    const contact = await getContact(id)
    res.render("admin/mostrar", {
        title: `Contato`,
        contact,
        userLogin
    })
}
controller.excludeContact = async(req, res) => {
    const userLogged = await req.session.userLogged
    const userLogin = await getUser(userLogged.id)
    const { id } = req.params
    const contact = await getContact(id)
    res.render("admin/excluir", {
        title:"Excluir contato",
        contact,
        userLogin
    })
}
controller.deleteContact = async (req, res) => {
    const { id } = req.params
    await Contact.destroy({
        where: { id }
    })
  
    res.redirect("/admin/contatos")
}

module.exports = controller
const controller = {}
const create = require("../utils/create")
const { getAllUsers, getUser, getUserAgendas, getUserEvents } = require('../services/users')
const { User } = require("../database/models")
const { getAllAgendas, getAgenda, getEventsAgendas, getBusinessHours } = require('../services/agendas')
const { Agenda } = require("../database/models")
const { BusinessHours } = require("../database/models")
const { getAllEvents, getEvent } = require('../services/events')
const { Event } = require("../database/models")


controller.index = async (req, res) => {
    const users = await getAllUsers()
    const agendas = await getAllAgendas()
    const events = await getAllEvents()
    res.render("admin/admin-index", { 
        title: "Dashboard Admin",
        users,
        agendas,
        events
   });
},

//Admin usuários
controller.users = async (req, res) => {
    const users = await getAllUsers();
    res.render(`admin/usuarios`, {
      title: "Usuários",
      users,
    });
},

controller.addUser = async (req, res) => {
    res.render(`admin/usuario-adicionar`, {
      title: req.path == "/cadastro" ? `Cadastro` : `Adicionar Usuário`,
    });
},

controller.createUser = async (req, res) => {
    const { nome, email, senha, avatar, admin, created_at, updated_at } = req.body;

    const slug = await create.slug(nome)

    await User.create({
      nome,
      senha,
      email,
      slug,
      avatar: avatar || null,
      admin: !!admin,
      createdAt: created_at,
      updatedAt: updated_at
    });
    res.redirect("/admin/usuarios");
},

controller.editUser = async (req, res) => {
    const { id } = req.params
    const user = await getUser(id)
    res.render(`admin/usuario-editar`, {
      title: `Editar Usuário ${req.params.nome}`,
      user,
    });
},

controller.updateUser = async (req, res) => {
    const { id } = req.params
    const { 
        nome, slug, email, senha, avatar, admin, 
        created_at, updated_at 
    } = req.body;

    await User.update(
    {
      nome: nome,
      slug: slug,
      email: email,
      senha: senha,
      avatar: avatar || null,
      admin: !!admin,
      createdAt: created_at,
      updatedAt: updated_at
    }, 
    {
      where: {id}
    })  
    res.redirect(`/admin/usuarios`);
},

controller.excludeUser = async (req, res) => {
    const { id } = req.params
    const user = await getUser(id)
    res.render("admin/usuario-excluir", {
      title: `Excluir Usuário ${user.nome}`,
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
    res.render("admin/usuario", {
      title: `Usuário`,
      user
    });
},
controller.showUserAgendas = async (req, res) => {
    const { id } = req.params
    const user = await getUser(id)
    const agendas = await getUserAgendas(id)
    res.render("admin/usuario-agendas", {
      title: `Agendas - ${ user.nome }`,
      user,
      agendas
    })
},
controller.showUserEvents = async (req, res) => {
    const { id } = req.params
    const user = await getUser(id)
    const events = await getUserEvents(id)
    res.render("admin/usuario-agendamentos", {
      title: `Agendamentos - ${ user.nome }`,
      user,
      events
    })
}

//Admin agendas
controller.adminAgendas = async (req, res) => {
    const agendas = await getAllAgendas()
    res.render("admin/agendas", {
        title: "Agendas",
        agendas
    })
}
controller.adminAddAgenda = async (req, res) => {
    let users = await getAllUsers()
    res.render("admin/agenda-adicionar", {
        title: req.path == "/cadastro" ? `Cadastro` : `Adicionar Agenda`,
        users
    })
}
controller.createAgenda = async (req, res) => {
    const { 
        userId, title, url, duration, 
        start, end, daysOfWeek, startTime, 
        endTime, created_at, updated_at 
    } = req.body;
    
    const response = await Agenda.create({
        userId, title, url, duration, start,
        end, createdAt: created_at, updatedAt: updated_at        
    })
    let start_time = create.time(startTime)
    let end_time = create.time(endTime)
    
    for(i = 0; i <= daysOfWeek.length; i++) {
        await BusinessHours.create(
            {
                agendaID: response.id,
                daysOfWeek: daysOfWeek[i],
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
    const { id } = req.params
    const agenda = await getAgenda(id)
    let businessHours = await create.businessHours(await getBusinessHours(id))
    businessHours = JSON.parse(businessHours)
    res.render("admin/agenda", {
        title: "Agenda",
        agenda,
        businessHours

    })
}

controller.showAgendaEvents = async (req, res) => {
    const { id } = req.params
    const agenda = await getAgenda(id)
    const events = await getEventsAgendas(id)
    res.render("admin/agenda-agendamentos", {
        title: `Agendamentos - ${agenda.title}`,
        agenda, 
        events
    })
}

controller.editAgenda = async (req, res) => {
    const { id } = req.params
    const agenda = await getAgenda(id)
    const businessHours = await create.businessHours(await getBusinessHours(id))

    res.render("admin/agenda-editar", {
        title: `Editar agenda`,
        agenda, 
        businessHours
    })
}
controller.updateAgenda = async (req, res) =>{
    const { id } = req.params
    const {
        userId, title, url, duration, start,
        end, daysOfWeek, startTime, endTime, 
        created_at, updated_at
    } =req.body
            
    await Agenda.update({
        userId, title, url, duration, start, end, 
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
    const { id } = req.params
    const agenda = await getAgenda(id)
    res.render("admin/agenda-excluir", {
        title:"Excluir agenda",
        agenda
    })
}
controller.deleteAgenda = async (req, res) => {
    const { id } = req.params
    await Agenda.destroy({
        where: { id }
    })
    res.redirect("/admin/agendas")
}

//Admin agendamentos
controller.adminEvents = async (req, res) => {
    const events = await getAllEvents()
    res.render("admin/agendamentos", {
        title: "Agendamentos",
        events
    })
}
controller.adminAddEvent = async(req, res) => {
    const events = await getAllEvents()
    res.render("admin/agendamento-adicionar", {
        title: "Adicionar agendamento", 
        events
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
    const { id } = req.params
    const event = await getEvent(id)
    res.render("admin/agendamento", {
        title: `Agendamento de ${event.title}`,
        event

    })
}
controller.editEvent = async (req, res) => {
    const { id } = req.params
    const event = await getEvent(id)

    res.render("admin/agendamento-editar", {
        title: `Editar agendamento de ${event.title}`,
        event
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
    const { id } = req.params
    const event = await getEvent(id)
    res.render("admin/agendamento-excluir", {
        title:"Excluir agendamento",
        event
    })
}
controller.deleteEvent = async (req, res) => {
    const { id } = req.params
    await Event.destroy({
        where: { id }
    })
  
    res.redirect("/admin/agendamentos")
}
    

module.exports = controller
const controller = {}
const get = require("../utils/get");
const set = require("../utils/set");
const { getAllUsers, getUser, getUserAgendas, getUserEvents } = require('../services/users')
const { User } = require("../database/models")
const { getAllAgendas, getAgenda, getEventsAgendas, getBusinessHours } = require('../services/agendas')
const { Agenda } = require("../database/models")
const { BusinessHours } = require("../database/models")
const { getAllEvents, getEvent } = require('../services/events')
const { Event } = require("../database/models")

const Sequelize = require("sequelize")

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
    } = req.body;
    console.log(userId)
    
    await Agenda.create({
        userId,
        title,
        url,
        duration,
        start,
        end,
        createdAt: created_at,
        updatedAt: updated_at
                
    })
    let start_time = get.time(startTime)
    let end_time = get.time(endTime)
    for(i = 0; i <= daysOfWeek.length; i++) {
        await BusinessHours.create(
            {
                agendaID: id,
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
    const businessHours = await getBusinessHours(id)
    
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
    const agenda = await get.byId(get.agendas, req.params.id)
    const businessHours = JSON.stringify(agenda.businessHours)

    res.render("admin/agenda-editar", {
        title: `Editar agenda`,
        agenda, 
        businessHours
    })
}
controller.updateAgenda = async (req, res) =>{
    let agendas = await get.agendas
    agendas = agendas.map(async (agenda) => {
        if(agenda.id == req.params.id) {
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
                modified_at
            } =req.body
            
            const user = get.byId(get.users, userId)
            if(user == undefined) {
                res.redirect("error")
            } else {
                const businessHours = await get.businessHours(daysOfWeek, startTime, endTime)
                const extendedProps = await get.extendedEditAgendas(userId, created_at, modified_at)
                return {
                    id: agenda.id,
                    extendedProps,
                    title,
                    url,
                    duration, 
                    start,
                    end, 
                    businessHours
                    
                }
            }
            
        } else {
            return agenda
        }
    })
    agendas = await Promise.all(agendas)
    set.agendas(agendas)
    res.redirect('/sucesso')
}

controller.excludeAgenda = async(req, res) => {
    const agenda = await get.byId(get.agendas, req.params.id)
    res.render("admin/agenda-excluir", {
        title:"Excluir agenda",
        agenda
    })
}
controller.deleteAgenda = async (req, res) => {
    const agendas = await get.agendas.filter(
        (agenda) => agenda.id != req.params.id
    )
    set.agendas(agendas)
    res.redirect("/sucesso")
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
    const events = await get.events
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
    const endTime = await get.endTime(start, startTime, agenda.duration)
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
    const endTime = await get.endTime(start, startTime, agenda.duration)
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
const controller = {}

const get = require("../utils/get")
const set = require("../utils/set")
const { getUserSlug, getUserAgendas } = require('../services/users')
const { User } = require("../database/models")
const { getAgenda, getEventsAgendas, getBusinessHours } = require('../services/agendas')
const { Agenda } = require("../database/models")
const { BusinessHours } = require("../database/models")
const { getAllEvents, getEvent } = require('../services/events')
const { Event } = require("../database/models")


controller.agendas = async (req, res) => {
    const { slug } = req.params
    const user = await getUserSlug(slug)
    const userId = user.id
    const agendas = await getUserAgendas(userId)
    res.render("agendamento/agendas",  {
        title: `Agendas - ${user.nome}`,
        user,
        agendas,
        userId
    })
    
}
controller.showAgenda = async (req, res) => {
    const { slug } = req.params
    const { id } = req.params
    const user = await getUserSlug(slug)
    const agenda = await getAgenda(id)
    const businessHours = await get.createdBusinessHours(await getBusinessHours(id))  
    const events = await get.createdEvent(await getEventsAgendas(id))   
    res.render("agendamento/agenda", {
        title: `${agenda.title} - ${user.nome}`,
        agenda,
        user,
        businessHours,
        events
        
    })
}
//Controllers de manipulação do JSON de Eventos
controller.createEvent = async (req, res) => {
    const { slug, id } = req.params
    const user = await getUserSlug(slug)
    const agenda = await getAgenda(id)
    const {
        title,
        start, 
        startTime,
        email,
        telefone,
        description, 
        created_at, 
        updated_at
    } = req.body
    
    
    const endTime = await get.endTime(start, startTime, agenda.duration)
    await Event.create ({
        userId: user.id,
        agendaId: agenda.id,
        title, 
        start,
        end: start,
        allDay: false, 
        startTime,
        endTime,
        backgroundColor: agenda.backgroundColor,
        url: agenda.url,
        emailAluno: email,
        telefoneAluno: telefone,
        description,
        createAt: created_at,
        updatedAt: updated_at


    })
    res.redirect(`/agendamento/${slug}/${id}`)
        
}

module.exports = controller


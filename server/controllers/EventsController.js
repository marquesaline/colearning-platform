const controller = {}

const get = require("../utils/get")
const set = require("../utils/set")
const { getUserSlug, getUserAgendas } = require('../services/users')
const { User } = require("../database/models")
const { getAllAgendas, getAgenda, getEventsAgendas, getBusinessHours } = require('../services/agendas')
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
    const userId = user.id
    const agenda = await getAgenda(userId)
    const businessHours = JSON.stringify(agenda.businessHours)
    let events = await getEventsAgendas(id)
    events = JSON.stringify(events)
    res.render("agendamento/agenda", {
        title: `${agenda.title} - ${user.nome}`,
        agenda,
        user,
        userId,
        businessHours,
        events
        
    })
}
//Controllers de manipulação do JSON de Eventos
controller.createEvent = async (req, res) => {
    const events = await get.events
    const id = await get.nextById(events)
    const user = await get.slug(get.users, req.params.slug)
    const agenda = await get.byId(get.agendas, req.params.id)
    
    const {
        title,
        start, 
        startTime,
        email,
        telefone,
        description

    } = req.body
    const extendedProps = await get.extendedEvents(user.id, agenda.id, email, telefone, description)
    const endTime = await get.endTime(start, startTime, agenda.duration)
    const newEvent = {
        id,
        extendedProps,
        title, 
        start,
        end: start,
        allDay: false, 
        startTime,
        endTime


    }
    events.push(newEvent)
    set.events(events)
    res.redirect('/sucesso')
        
}

module.exports = controller


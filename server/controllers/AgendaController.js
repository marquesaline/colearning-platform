const controller = {}

const get = require("../utils/get")
const set = require("../utils/set")
const { getAllUsers, getUser, getUserAgendas, getUserEvents } = require('../services/users')
const { User } = require("../database/models")
const { getAllAgendas, getAgenda, getEventsAgendas, getBusinessHours } = require('../services/agendas')
const { Agenda } = require("../database/models")
const { BusinessHours } = require("../database/models")
const { getAllEvents, getEvent } = require('../services/events')
const { Event } = require("../database/models")

const Sequelize = require("sequelize")

const getEventsByAgendaId = async(id) => 
    await get.events.filter((event) => event.extendedProps.agendaId == id)


//Controllers Agenda 
controller.calendar = async (req, res) => {
    const { id } = req.params
    const eventsJson = await getUserEvents(id)
    let events = await get.createdEvent(eventsJson)
    events = JSON.stringify(events)
    const agendas = await getUserAgendas(id)
    const user = await getUser(id)
    
    res.render('areaLogada/calendario',  {
        title: 'Calendário',
        agendas,
        user,
        events        
    })
    
    
}

controller.addAgenda = async (req, res) => res.render('criar-agenda', {
    title: 'Criar Agenda',
    agendas: await get.agendas,
    user: await get.byId(get.users, req.params.userId)
}),
controller.editAgenda = async (req, res) => {
    const agenda = await get.byId(get.agendas, req.params.agendaId)
    const agendas = await get.agendas
    const user = await get.byId(get.users, req.params.userId)
    res.render('areaLogada/editar-agenda', {
        title: `Editar ${agenda.title}`,
        user,
        agenda, 
        agendas
            
    })
}
controller.removeAgenda = async (req, res) => {
    const agenda = await get.byId(get.agendas, req.params.agendaId)
    const agendas = await get.agendas
    const user = await get.byId(get.users, req.params.userId)
    res.render('areaLogada/excluir-agenda', {
        title: `Excluir ${agenda.title}`,
        user,
        agenda, 
        agendas
            
    })
}


//Controllers de manipulação do JSON de Agendas
controller.createAgenda = async (req, res) => {
    const agendas = await get.agendas
    const id = await get.nextById(agendas)
    const userId = req.params.userId
    const {
        title,
        url,
        duration,
        start,
        end,
        daysOfWeek,
        startTime,
        endTime
    } = req.body;
    const businessHours = await get.businessHours(daysOfWeek, startTime, endTime)
    const extendedProps = await get.extendedCreatAgendas(userId)
    const newAgenda = {
        id,
        extendedProps,
        title,
        url,
        duration,
        start,
        end,
        businessHours, 
        
    };
    agendas.push(newAgenda)
    set.agendas(agendas)
    res.redirect("/sucesso")
}
controller.updateAgenda = async (req, res) => {
    let agendas = await get.agendas
    const userId = req.params.userId
    agendas = agendas.map((agenda) => {
        if (agenda.id == req.params.id) {
            const {
                title,
                url,
                duration,
                start,
                end,
                daysOfWeek,
                startTime,
                endTime
            } = req.body;
            const businessHours = get.businessHours(daysOfWeek, startTime, endTime)
            return {
                id: agenda.id,
                
                title,
                url,
                duration,
                start,
                end,
                startTime,
                endTime
            }
        } else {
            return agenda
        }
    })
    setAgendas(agendas)
    res.redirect('/sucesso')
}
controller.deleteAgenda = async (req, res) => {
    const agendas = await get.agendas.filter(
        (agenda) => agenda.id != req.params.id
    );
    set.agendas(agendas);
    res.redirect('/sucesso')
}

module.exports = controller
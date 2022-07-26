const controller = {}
const helper = require('../service/helper')
const fs = require("fs");
const path = require("path");
const get = require("../service/get");

var moment = require('moment');
moment.locale('pt-br')

//Constates de uso do JSON e de criação dos dados para a agenda
const getAgendas = get.agenda
const getUsers = get.users
const getEvents = get.events
const getUserId = (id) => getUsers.find((user) => user.id == id);
const getUserSlug = async (slug) => await getUsers.find((user) => user.slug == slug);
const getAgendaId = async(id) => await getAgendas.find((agenda) => agenda.id == id)
const getEventsByAgendaId = async(id) => await getEvents.filter((event) => event.extendedProps.agendaId == id)



const getBusinessHours = async (daysOfWeek, startTime, endTime) => {
    let businessHours = []
    for (i = 0; i <= 6; i++) {
        if (daysOfWeek[i] == null) {
        } else {
            businessHours.push({
                daysOfWeek: daysOfWeek[i],
                startTime: startTime[i],
                endTime: endTime[i]
            })
        }
    }
    return businessHours
}
const getExtendedAgendas = async(userId) => {
    let extendedProps = {
        userId: userId
    }
    return extendedProps
}
const getExtendedEvents = async(userId, agendaId, email, telefone, description) => {
    let extendedProps = {
        userId: userId,
        agendaId: agendaId,
        emailAluno: email, 
        telefoneAluno: telefone,
        description: description
    }
    return extendedProps
    
}
const getEnd = async(start, startTime, duration) => {
    dateTime = moment(`${start}T${startTime}`)
    time = moment(duration, 'hours').format('HH:mm')
    endTime = moment(dateTime).add(time).format("HH:mm")
    
    return endTime
}
//Controllers Agenda 
controller.addAgenda = async (req, res) => res.render('criar-agenda', {
    title: 'Criar Agenda',
    agendas: await getAgendas,
    user: await getUserId(req.params.userId)
}),
controller.editAgenda = async (req, res) => {
    const agenda = await getAgendaId(req.params.agendaId)
    const agendas = await getAgendas
    const user = await getUserId(req.params.userId)
    res.render('editar-agenda', {
        title: `Editar ${agenda.title}`,
        user,
        agenda, 
        agendas
            
    })
}
controller.removeAgenda = async (req, res) => {
    const agenda = await getAgendaId(req.params.agendaId)
    const agendas = await getAgendas
    const user = await getUserId(req.params.userId)
    res.render('excluir-agenda', {
        title: `Excluir ${agenda.title}`,
        user,
        agenda, 
        agendas
            
    })
}


//Controllers de manipulação do JSON de Agendas
controller.createAgenda = async (req, res) => {
    const agendas = await getAgendas
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
    const businessHours = await getBusinessHours(daysOfWeek, startTime, endTime)
    const extendedProps = await getExtendedAgendas(userId)
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
    setAgendas(agendas)
    res.redirect("/sucesso")
}
controller.updateAgenda = async (req, res) => {
    let agendas = await getAgendas
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
            const businessHours = getBusinessHours(daysOfWeek, startTime, endTime)
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
    const agendas = await getAgendas.filter(
        (agenda) => agenda.id != req.params.id
    );
    setAgendas(agendas);
    res.redirect('/sucesso')
}
//Controllers de agendamentos
controller.agendas = async (req, res) => {
    const user = await getUserSlug(req.params.slug)
    const userId = user.id
    const agendas = await getAgendas
    res.render("agendamento/agendas",  {
        title: `Agendas - ${user.nome}`,
        user,
        agendas,
        userId
    })
}
controller.showAgenda = async (req, res) => {
    const user = await getUserSlug(req.params.slug)
    const userId = user.id
    const agenda = await getAgendaId(req.params.id)
    const businessHours = JSON.stringify(agenda.businessHours)
    let events = await getEventsByAgendaId(req.params.id)
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
    const events = await getEvents
    const id = await get.nextById(events)
    const user = await getUserSlug(req.params.slug)
    const agenda = await getAgendaId(req.params.id)
    
    const {
        title,
        start, 
        startTime,
        email,
        telefone,
        description

    } = req.body
    const extendedProps = await getExtendedEvents(user.id, agenda.id, email, telefone, description)
    const endTime = await getEnd(start, startTime, agenda.duration)
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
    setEvents(events)
    res.redirect('/sucesso')
        
}




module.exports = controller
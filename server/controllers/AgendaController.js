const controller = {}
const get = require("../utils/get")
const {  getUser, getUserAgendas, getUserEvents } = require('../services/users')
const { getAgenda, getEventsAgendas, getBusinessHours } = require('../services/agendas')
const { Agenda } = require("../database/models")
const { BusinessHours } = require("../database/models")


//Controllers Agenda 
controller.calendar = async (req, res) => {
    const userLogged = await req.session.userLogged
    const events = await get.createdEvent(await getUserEvents(userLogged.id))
    const agendas = await getUserAgendas(userLogged.id)
    const user = await getUser(userLogged.id)
    res.render('areaLogada/calendario',  {
        title: 'Calendário',
        agendas,
        user,
        events        
    })
}
//arrumar - erro 
controller.addAgenda = async (req, res) => {
    const userLogged = await req.session.userLogged
    const agendas = await getUserAgendas(userLogged.id)
    const user = await getUser(userLogged.id)
    res.render('areaLogada/criar-agenda', {
        title: 'Criar Agenda',
        agendas,
        user
    })
}
controller.createAgenda = async (req, res) => {
    const userLogged = await req.session.userLogged
    const userId = userLogged.id
    
    const { 
        title, url, duration, start, end, 
        daysOfWeek, startTime, endTime, 
        created_at, updated_at 
    } = req.body;
   
    const backgroundColor = await get.createColor()
    const response = await Agenda.create({
        userId, title, url, duration, 
        start, end, backgroundColor,
        createdAt: created_at,
        updatedAt: updated_at
    })

    let start_time = get.time(startTime)
    let end_time = get.time(endTime)

    for(i = 0; i < daysOfWeek.length; i++) {
        await BusinessHours.create(
            {
                agendaId: response.id,
                daysOfWeek: daysOfWeek[i],
                startTime: start_time[i],
                endTime: end_time[i],
                createdAt: created_at,
                updatedAt: updated_at
            },
            
        )
    }
    res.redirect("/conta")
}

controller.editAgenda = async (req, res) => {
    const userLogged = await req.session.userLogged
    const { agendaId } = req.params
    const agendas = await getUserAgendas(userLogged.id)
    const agenda = await getAgenda(agendaId)
    console.log(agenda.createdAt)
    const user = await getUser(userLogged.id)
    res.render('areaLogada/editar-agenda', {
        title: `Editar agenda - ${agenda.title}`,
        user,
        agenda, 
        agendas
            
    })
}
controller.updateAgenda = async (req, res) => {
    const { agendaId } = req.params
    const { 
        title, url, duration, start, end, 
        daysOfWeek, startTime, endTime, 
        backgroundColor, created_at, updated_at 
    } = req.body;
    console.log(created_at)
    const id = agendaId
    await Agenda.update({
        title, url, duration, 
        start, end, backgroundColor,
        createdAt: created_at, 
        updatedAt: updated_at
    },
    { where: { id } })
   
    let start_time = get.time(startTime)
    let end_time = get.time(endTime)

    await BusinessHours.destroy({ where: {agendaId: id}})

    for(i = 0; i < daysOfWeek.length; i++) {
        
        await BusinessHours.create(
            {
                agendaId,
                daysOfWeek: daysOfWeek[i],
                startTime: start_time[i],
                endTime: end_time[i],
                createdAt: created_at,
                updatedAt: updated_at
            }   
        )
       
    }
    res.redirect(`/conta/${agendaId}`)
}

controller.removeAgenda = async (req, res) => {
    const userLogged = await req.session.userLogged
    const agenda = await getAgenda(req.params.agendaId)
    const agendas = await getUserAgendas(userLogged.id)
    const user = await getUser(userLogged.id)
    res.render('areaLogada/excluir-agenda', {
        title: `Excluir ${agenda.title}`,
        user,
        agenda, 
        agendas
            
    })
}
controller.deleteAgenda = async (req, res) => {
    const userLogged = await req.session.userLogged
    const id = req.params.agendaId
    await Agenda.destroy({
        where: { id }
    })
    res.redirect('/conta')
}

controller.agenda = async (req, res) => {
    const userLogged = await req.session.userLogged
    const { agendaId } = req.params
    const agendas = await getUserAgendas(userLogged.id)
    const agenda = await getAgenda(agendaId)
    const user = await getUser(userLogged.id)
    const businessHours = await get.createdBusinessHours(await getBusinessHours(agendaId))
    const events = await get.createdEvent(await getEventsAgendas(agendaId))    
    res.render('areaLogada/agenda', {
        title: `Agenda`,
        agenda,
        agendas,
        user,
        businessHours,
        events
    })
}


module.exports = controller
const controller = {}
const create = require("../utils/create")
const {  getUser, getUserAgendas, getUserEvents } = require('../services/users')
const { getAgenda, getEventsAgendas, getBusinessHours } = require('../services/agendas')
const { Agenda, BusinessHours } = require("../database/models")


//Controllers Agenda 
controller.calendar = async (req, res) => {
    const userLogged = await req.session.userLogged
    const events = await create.event(await getUserEvents(userLogged.id))
    const agendas = await getUserAgendas(userLogged.id)
    const user = await getUser(userLogged.id)
    console.log(user)
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
   
    const backgroundColor = await create.color()
    const response = await Agenda.create({
        userId, title, url, duration, 
        start, end, backgroundColor,
        createdAt: created_at,
        updatedAt: updated_at
    })

    let start_time = create.time(startTime)
    let end_time = create.time(endTime)

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
        created_at, updated_at 
    } = req.body;
    backgroundColor = agenda.backgroundColor
    const id = agendaId
    await Agenda.update({
        title, url, duration, 
        start, end, backgroundColor,
        createdAt: created_at, 
        updatedAt: updated_at
    },
    { where: { id } })
   
    let start_time = create.time(startTime)
    let end_time = create.time(endTime)

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
    const businessHours = await create.businessHours(await getBusinessHours(agendaId))
    const events = await create.event(await getEventsAgendas(agendaId))    
    res.render('areaLogada/agenda', {
        title: `Agenda - ${agenda.title}`,
        agenda,
        agendas,
        user,
        businessHours,
        events
    })
}


module.exports = controller
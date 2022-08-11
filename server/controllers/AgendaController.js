const controller = {}

const get = require("../utils/get")
const set = require("../utils/set")
const { getAllUsers, getUser, getUserAgendas, getUserEvents } = require('../services/users')
const { User } = require("../database/models")
const { getAllAgendas, getAgenda, getEventsAgendas, getBusinessHours } = require('../services/agendas')
const { Agenda } = require("../database/models")
const { BusinessHours } = require("../database/models")
const { data } = require("jquery")

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
    
    const { title, url, duration, start, end, daysOfWeek, startTime, endTime } = req.body;

    const response = await Agenda.create({
        userId, title, url, duration, start, end, 
        createdAt: created_at,
        updatedAt: updated_at
    })

    let start_time = get.time(startTime)
    let end_time = get.time(endTime)

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
    res.redirect("/conta")
}

controller.editAgenda = async (req, res) => {
    const userLogged = await req.session.userLogged
    const { agendaId } = req.params
    const agendas = await getUserAgendas(userLogged.id)
    const agenda = await getAgenda(agendaId)
    const user = await getUser(userLogged.id)
    res.render('areaLogada/editar-agenda', {
        title: `Editar ${agenda.title}`,
        user,
        agenda, 
        agendas
            
    })
}
controller.updateAgenda = async (req, res) => {
    const userLogged = await req.session.userLogged
    const { agendaId } = req.params
    const { title, url, duration, start, end, daysOfWeek, startTime, endTime, created_at, updated_at } = req.body;
    const id = agendaId
    const response = await Agenda.update({
        title, url, duration, start, end, 
        createdAt: created_at, 
        updatedAt: updated_at
    },
    { where: { id } })
   
    let start_time = get.time(startTime)
    
    let end_time = get.time(endTime)


    for(i = 0; i <= daysOfWeek.length; i++) {
        //colocar um IF pra checar se tem pra atualizar ou criar
        await BusinessHours.update(
            {
                agendaID: response.id,
                daysOfWeek: daysOfWeek[i],
                startTime: start_time[i],
                endTime: end_time[i],
                createdAt: created_at,
                updatedAt: updated_at
            },
            { where: {agendaId: id} }    
        )
    }
    res.redirect(`/conta/${agendaId}`)
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



controller.deleteAgenda = async (req, res) => {
    const agendas = await get.agendas.filter(
        (agenda) => agenda.id != req.params.id
    );
    set.agendas(agendas);
    res.redirect('/sucesso')
}

module.exports = controller
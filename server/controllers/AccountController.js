const controller = {}
const { group } = require("console");
const fs = require("fs");
const path = require("path");
const get = require("../service/get")

//Constates de uso do JSON e de criação dos dados para a agenda
const getAgendas = get.agenda
const getAgendaId = async (id) => await getAgendas.find((agenda) => agenda.id == id)
const getUsers = get.users
const getUserId = (id) => getUsers.find((user) => user.id == id);
const getEvents = get.events
const getEventsId = async (id) =>
    await getEvents.filter((event) => event.extendedProps.idagenda == id)

   

controller.events = async (req, res) => res.json(await getEvents)
controller.eventsId = async (req, res) =>
    res.json(await getEventsId(req.params.id))

//Tela principal com o calendário do usuário
controller.calendar = async (req, res) => {
    
    res.render('calendario',  {
        title: 'Calendário',
        agendas: await getAgendas,
        user: await getUserId(req.params.userId),
        agenda: await getAgendaId(req.params.agendaId),
        users: await getUsers,
        agendas: await getAgendas
    })
    
    
}
controller.account = async (req, res) => res.render('minha-conta', { 
    title: 'Minha Conta',
    user: await getUserId(req.params.userId)
}),
controller.editAccount = async (req, res) => {
    res.render('minha-conta-editar', {
        title: 'Editar - Minha Conta',
        user: await getUserId(req.params.userId)
    })
},




module.exports = controller
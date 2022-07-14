const controller = {}
const { group } = require("console");
const fs = require("fs");
const path = require("path");
const get = require("../utils/get")

//Constates de uso do JSON e de criação dos dados para a agenda
const getAgendas = get.agenda
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
    const idUser = req.params.userId
    console.log(idUser)
    res.render('calendario',  {
        title: 'Calendário',
        agendas: await getAgendas,
        idUser
    })
    
    
}
controller.account = (req, res) => res.render('minha-conta', { title: 'Minha Conta'}),
controller.editAccount = (req, res) => {
    res.render('minha-conta-editar', {
        title: 'Editar - Minha Conta'
    })
},
controller.signature = (req, res) => res.render('assinatura', { title: 'Assinatura'})
controller.editSignature = (req, res) => {
    res.render('assinatura-editar', {
        title: 'Editar - Assinatura'
    })
}



module.exports = controller
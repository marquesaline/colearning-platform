const controller = {}
const fs = require("fs");
const path = require("path");
const get = require("../utils/get")
const set = require("../utils/set")


const getEventsId = async (id) =>
    await get.events.filter((event) => event.extendedProps.userId == id)

   
controller.events = async (req, res) => res.json(await get.Events)
controller.eventsId = async (req, res) =>
    res.json(await getEventsId(req.params.id))

//Tela principal com o calendário do usuário
controller.calendar = async (req, res) => {
    const events = await getEventsId(req.params.userId)
    console.log(events)
    
    res.render('calendario',  {
        title: 'Calendário',
        agendas: await get.agendas,
        users: await get.users,
        user: await get.byId(get.users, req.params.userId),
        agenda: await get.byId(get.agendas, req.params.agendaId),
        events 
        
        
    })
    
    
}
controller.account = async (req, res) => res.render('minha-conta', { 
    title: 'Minha Conta',
    user: await get.byId(get.users, req.params.userId)
}),
controller.editAccount = async (req, res) => {
    res.render('minha-conta-editar', {
        title: 'Editar - Minha Conta',
        user: await get.byId(get.users,req.params.userId)
    })
},




module.exports = controller
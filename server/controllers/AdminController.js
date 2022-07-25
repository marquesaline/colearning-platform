const controller = {}
const helper = require('../service/helper')
const fs = require("fs");
const path = require("path");
const get = require("../service/get");
const set = require("../service/set")

const getUserId = async (id) => await get.users.find((user) => user.id == id);

controller.adminAgendas = async (req, res) => {
    const agendas = await get.agenda
    res.render("admin/agendas", {
        title: "Agendas",
        agendas
    })
}
controller.adminAddAgenda = async (req, res) => {
    let users = await get.users
   
    res.render("admin/agenda-adicionar", {
        title: req.path == "/cadastro" ? `Cadastro` : `Adicionar Agenda`,
        users
    })
}
controller.createAgenda = async (req, res) => {
    const agendas = await get.agenda
    const users = await get.users
    const id = await get.nextById(agendas)
    const {
        userId,
        title,
        duration,
        start,
        end,
        daysOfWeek,
        startTime,
        endTime
    } = req.body;
    console.log(userId)
    
    const user = await getUserId(userId)
    //função pra checar se o usuário existe antes de criar a agenda
    if(user == undefined) {
        //tratar esse erro
        res.redirect("error")
    } else {
        const businessHours =  await get.BusinessHours(daysOfWeek, startTime, endTime)
        const extendedProps = await get.ExtendedAgendas(user.id)
    
        const newAgenda = {
            id,
            extendedProps,
            title,
            duration,
            start,
            end,
            businessHours, 
                
        };
        agendas.push(newAgenda)
        set.agendas(agendas)
        res.redirect("/sucesso")
        }
    
} 

controller.showAgenda = async (req, res) => {
    const agenda = get.byId(get.agenda, req.params.id)
    res.render("admin/agenda", {
        title: "Agenda",

    })
}
    
    

module.exports = controller
const controller = {}
const helper = require('../service/helper')
const fs = require("fs");
const path = require("path");
const get = require("../service/get");
const set = require("../service/set")

controller.index = async (req, res) => {
    res.render("admin/admin-index", { 
      title: "Dashboard Admin"
     // user: await getUserId()
   });
},

//Admin agendas

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
        url,
        duration,
        start,
        end,
        daysOfWeek,
        startTime,
        endTime,
        created_at,
        modified_at
    } = req.body;
    console.log(userId)
    
    const user = await get.byId(get.users, userId)
    //função pra checar se o usuário existe antes de criar a agenda
    if(user == undefined) {
        //tratar esse erro
        res.redirect("error")
    } else {
        const businessHours =  await get.BusinessHours(daysOfWeek, startTime, endTime)
        const extendedProps = await get.extendedCreatAgendas(user.id, created_at, modified_at)
    
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
    
} 

controller.showAgenda = async (req, res) => {
    const agenda = await get.byId(get.agenda, req.params.id)
    const businessHours = JSON.stringify(agenda.businessHours)
    
    res.render("admin/agenda", {
        title: "Agenda",
        agenda,
        businessHours

    })
}

controller.editAgenda = async (req, res) => {
    const agenda = await get.byId(get.agenda, req.params.id)
    const businessHours = JSON.stringify(agenda.businessHours)

    res.render("admin/agenda-editar", {
        title: `Editar agenda`,
        agenda, 
        businessHours
    })
}
controller.updateAgenda = async (req, res) =>{
    let agendas = await get.agenda
    agendas = agendas.map((agenda) => {
        if(agenda.id == req.params.id) {
            const {
                userId,
                title,
                url,
                duration, 
                start,
                end, 
                daysOfWeek,
                startTime,
                endTime,
                created_at,
                modified_at
            } =req.body
            const businessHours = get.BusinessHours(daysOfWeek, startTime, endTime)
            const extendedProps = get.extendedCreatAgendas(userId, created_at, modified_at)
            return {
                id: agenda.id,
                extendedProps,
                title,
                url,
                duration, 
                start,
                end, 
                
            }
        } else {
            return agenda
        }
    })
    set.agendas(agendas)
    res.redirect('/sucesso')
}

controller.excludeAgenda = async(req, res) => {
    const agenda = await get.byId(get.agenda, req.params.id)
    res.render("admin/agenda-excluir", {
        title:"Excluir agenda",
        agenda
    })
}
controller.deleteAgenda = async (req, res) => {
    const agendas = await get.agenda.filter(
        (agenda) => agenda.id != req.params.id
    )
    set.agendas(agendas)
    res.redirect("/sucesso")
}

//Admin agendamentos
controller.adminEvents = async (req, res) => {
    const events = await get.events
    res.render("admin/agendamentos", {
        title: "Agendamentos",
        events
    })
}


    

module.exports = controller
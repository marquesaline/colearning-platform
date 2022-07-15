const controller = {}

const fs = require("fs");
const path = require("path");
const get = require("../utils/get")

//Constates de uso do JSON e de criação dos dados para a agenda
const getAgendas = get.agenda
const getUsers = get.users
const getUserId = (id) => getUsers.find((user) => user.id == id);
const getUserSlug = async (slug) => await getUsers.find((user) => user.slug == slug);
const getAgendaId = async(id) => await getAgendas.find((agenda) => agenda.id == id)
const getNextId = get.nextById(getAgendas)
const setAgendas = (agendas) => helper.write("agenda.json", agendas);

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



//Controllers de manipulação do JSON
controller.createAgenda = async (req, res) => {
    const agendas = await getAgendas
    const id = await getNextId
    const {
        title,
        duration,
        start,
        end,
        daysOfWeek,
        startTime,
        endTime
    } = req.body;
    const businessHours = await getBusinessHours(daysOfWeek, startTime, endTime)
    const events = []
    const newAgenda = {
        id,
        title,
        duration,
        start,
        end,
        businessHours, 
        events
    };
    agendas.push(newAgenda)
    setAgendas(agendas)
    res.redirect("/sucesso")
}
controller.updateAgenda = async (req, res) => {
    let agendas = await getAgendas
    agendas = agendas.map((agenda) => {
        if (agenda.id == req.params.id) {
            const {
                title,
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
    const idUser = user.id
    const agendas = await getAgendas
    res.render("agendas",  {
        title: `Agendas - ${user.nome}`,
        user,
        agendas,
        idUser
    })
}
controller.showAgenda = async (req, res) => {
    const user = await getUserSlug(req.params.slug)
    const idUser = user.id
    const agenda = await getAgendaId(req.params.id)
    const businessHours = JSON.stringify(agenda.businessHours)
    
    res.render("agenda", {
        title: `${agenda.title} - ${user.nome}`,
        agenda,
        user,
        idUser,
        businessHours
        
    })
},
controller.createEvent = async (req, res) => {
    let agendas = await getAgendas
    let events = []
    agendas = agendas.map((agenda) => {
        if(agenda.id == req.params.id) {
            const {
                start,
                startTime,
                title
            } = req.body
            const newEvent = {
                start, 
                startTime,
                title
            }
            events.push(newEvent)
            return{
                events
            }        
        } else {
            return agenda
        }
    
    })
    setAgendas(agendas)
    res.redirect('/sucesso')
        
}


module.exports = controller
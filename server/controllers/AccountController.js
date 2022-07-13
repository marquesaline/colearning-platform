const controller = {}
const { group } = require("console");
const fs = require("fs");
const path = require("path");
const get = require("../utils/get")

//Constates de uso do JSON e de criação dos dados para a agenda
const getAgendas = get.agenda
const getAgendaId = async (id) => await getAgendas.filter((agenda) => agenda.extendedProps.iduser == id)
const getNextId = get.nextById(getAgendas)
const setAgendas = (agendas) => helper.write("agenda.json", agendas);

const getEvents = get.events
const getEventsId = async (id) =>
    await getEvents.filter((event) => event.extendedProps.idagenda == id)

const getGroupId = async(id) => {
    await getAgendas.filter((agenda) => agenda.groupId == id)
    
}
    

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
//Controllers Agenda 
controller.addAgenda = async (req, res) => res.render('criar-agenda', {
    title: 'Criar Agenda',
    agendas: await getAgendas
}),
controller.editAgenda = async (req, res) => {
    const agenda = getAgendaId(req.params.id)
    res.render('editar-agenda', {
        agendas: await getAgendas,
        title: `Editar ${agenda.title}`,
        agenda
    })
}
controller.removeAgenda = async (req, res) => {
    const agenda = getAgendaId(req.params.id)
    res.render('excluir-agenda', {
        agendas: await getAgendas,
        title: `Excluir Agenda ${agenda.title}`,
        agenda
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
    const newAgenda = {
        id,
        title,
        duration,
        start,
        end,
        businessHours
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


module.exports = controller
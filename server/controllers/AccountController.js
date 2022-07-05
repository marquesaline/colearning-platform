const controller = {}
const fs = require("fs");
const path = require("path");

const helper = {};

helper.read = (fileName) =>
  fs.readFileSync(path.join(__dirname, `../data/${fileName}`), "utf-8");

helper.write = (fileName, data) =>
fs.writeFileSync(
    path.join(__dirname, `../data/${fileName}`),
    JSON.stringify(data),
    "utf-8"
);

const getAgendas = () => JSON.parse(helper.read("agenda.json"))
const getAgendaPorId = (id) =>
    getAgendas().find((agenda) => agenda.id == id)

const setAgendas = (agendas) => helper.write("agenda.json", agendas);

const getEvents = () => JSON.parse(helper.read("events.json"))
const getEventsId = async (id) =>
    await getEvents().find((event) => event.id == id)

const getNextId = async () => {
    const agenda = await getAgendas()
    const newId = parseInt(agenda[agenda.length - 1].id) + 1
    return newId
}
    
// Controllers

// acesso ao json
controller.events = async (req, res) => res.json(await getEvents())
controller.eventsId = async (req, res) =>
    res.json(await getEventsId(req.params.id))

//acessar as agendas
controller.calendar = (req, res) => res.render('calendario', {
    title: 'Calendário'
}),

controller.add = (req, res) => res.render('criar-agenda', { title: 'Criar Agenda' }),

controller.create = async (req, res) => {
    const agendas = await getAgendas()
    const id = await getNextId()
    const { title, duration, start, end, startTime, endTime } = req.body;
    const newAgenda = {
        id,
        title,
        duration,
        start,
        end,
        startTime,
        endTime,
    };
    agendas.push(newAgenda)
    setAgendas(agendas)
    res.redirect("/sucesso")
}
controller.editAgenda = async (req, res) => {
    let agendas = await getAgendas()
    agendas = agendas.map((agenda) => {
        if(agenda.id == req.params.id) {
            const { title, duration, start, end, startTime, endTime } = req.body;
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
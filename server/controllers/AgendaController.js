const controller = {}

const get = require("../utils/get")
const set = require("../utils/set")


const getEventsByAgendaId = async(id) => 
    await get.events.filter((event) => event.extendedProps.agendaId == id)


//Controllers Agenda 
controller.addAgenda = async (req, res) => res.render('criar-agenda', {
    title: 'Criar Agenda',
    agendas: await get.agendas,
    user: await get.byId(get.users, req.params.userId)
}),
controller.editAgenda = async (req, res) => {
    const agenda = await get.byId(get.agendas, req.params.agendaId)
    const agendas = await get.agendas
    const user = await get.byId(get.users, req.params.userId)
    res.render('editar-agenda', {
        title: `Editar ${agenda.title}`,
        user,
        agenda, 
        agendas
            
    })
}
controller.removeAgenda = async (req, res) => {
    const agenda = await get.byId(get.agendas, req.params.agendaId)
    const agendas = await get.agendas
    const user = await get.byId(get.users, req.params.userId)
    res.render('excluir-agenda', {
        title: `Excluir ${agenda.title}`,
        user,
        agenda, 
        agendas
            
    })
}


//Controllers de manipulação do JSON de Agendas
controller.createAgenda = async (req, res) => {
    const agendas = await get.agendas
    const id = await get.nextById(agendas)
    const userId = req.params.userId
    const {
        title,
        url,
        duration,
        start,
        end,
        daysOfWeek,
        startTime,
        endTime
    } = req.body;
    const businessHours = await get.businessHours(daysOfWeek, startTime, endTime)
    const extendedProps = await get.extendedCreatAgendas(userId)
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
controller.updateAgenda = async (req, res) => {
    let agendas = await get.agendas
    const userId = req.params.userId
    agendas = agendas.map((agenda) => {
        if (agenda.id == req.params.id) {
            const {
                title,
                url,
                duration,
                start,
                end,
                daysOfWeek,
                startTime,
                endTime
            } = req.body;
            const businessHours = get.businessHours(daysOfWeek, startTime, endTime)
            return {
                id: agenda.id,
                
                title,
                url,
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
    const agendas = await get.agendas.filter(
        (agenda) => agenda.id != req.params.id
    );
    set.agendas(agendas);
    res.redirect('/sucesso')
}
//Controllers de agendamentos
controller.agendas = async (req, res) => {
    const user = await get.slug(get.users, req.params.slug)
    const userId = user.id
    const agendas = await get.agendas
    res.render("agendamento/agendas",  {
        title: `Agendas - ${user.nome}`,
        user,
        agendas,
        userId
    })
}
controller.showAgenda = async (req, res) => {
    const user = await get.slug(get.users, req.params.slug)
    const userId = user.id
    const agenda = await get.byId(get.agendas, req.params.id)
    const businessHours = JSON.stringify(agenda.businessHours)
    let events = await getEventsByAgendaId(req.params.id)
    events = JSON.stringify(events)
    res.render("agendamento/agenda", {
        title: `${agenda.title} - ${user.nome}`,
        agenda,
        user,
        userId,
        businessHours,
        events
        
    })
}
//Controllers de manipulação do JSON de Eventos
controller.createEvent = async (req, res) => {
    const events = await get.events
    const id = await get.nextById(events)
    const user = await get.slug(get.users, req.params.slug)
    const agenda = await get.byId(get.agendas, req.params.id)
    
    const {
        title,
        start, 
        startTime,
        email,
        telefone,
        description

    } = req.body
    const extendedProps = await get.extendedEvents(user.id, agenda.id, email, telefone, description)
    const endTime = await get.endTime(start, startTime, agenda.duration)
    const newEvent = {
        id,
        extendedProps,
        title, 
        start,
        end: start,
        allDay: false, 
        startTime,
        endTime


    }
    events.push(newEvent)
    set.events(events)
    res.redirect('/sucesso')
        
}




module.exports = controller
// unificação das funções de get dos dados
const helper = require("./helper")

const get = {}

const moment = require('moment')
moment.locale('pt-br')

get.datesMoment = async(dateTo) => {
    let date = moment(dateTo).format("DD-MM-YYYY HH:MM")
    return date
}
//funções específicas das agendas e agendamentos
get.createdEvent = async(events) => {
    const eventos = []

    events.map(evento => {
        
        eventos.push({
            id: evento.id,
            title: evento.title,
            allDay: evento.allDay,
            start: moment(`${evento.start}T${evento.startTime}`).format(),
            end: moment(`${evento.end}T${evento.endTime}`).format(),
            backgroundColor: evento.backgroundColor,
            url: evento.url,
            extendedProps: {
                userId: evento.userId,
                agendaId: evento.agendaId,
                emailAluno: evento.emailAluno,
                telefoneAluno: evento.telefoneAluno,
                description: evento.description,
                createdAt: evento.createdAt,
                updatedAt: evento.updatedAt
            },
           
            
        })
    })
    return JSON.stringify(eventos)
}
get.createdBusinessHours = async(horarios) => {
    const businessHours = []
    horarios.map(horario => {
        businessHours.push({
            daysOfWeek: horario.daysOfWeek,
            startTime: horario.startTime,
            endTime: horario.endTime
        })
    })
    
    return JSON.stringify(businessHours)
}
    
get.creatAgendas = async(agendas) => {
    let created = moment(created_at).format("DD-MM-YYYY HH:MM")
    let modified = moment(modified_at).format("DD-MM-YYYY HH:MM")
    let extendedProps = {
        userId: userId,
        createdAt: created,
        modifiedAt: modified
    }
    return extendedProps
}

get.extendedEditAgendas = async(userId, created_at, modified_at) => {
    
    let modified = moment(modified_at).format("DD-MM-YYYY")
    
    let extendedProps = {
        userId: userId,
        createdAt: created_at,
        modifiedAt: modified
    }
    return extendedProps
}

get.extendedEvents = async(userId, agendaId, email, telefone, description, created_at, modified_at) => {
    let created = moment(created_at).format("DD-MM-YYYY")
    let modified = moment(modified_at).format("DD-MM-YYYY")
    
    let extendedProps = {
        userId: userId,
        agendaId: agendaId,
        emailAluno: email, 
        telefoneAluno: telefone,
        description: description,
        createdAt: created,
        modifiedAt: modified
    }
    return extendedProps
}
get.extendedEditEvents = async(userId, agendaId, email, telefone, description, created_at, modified_at) => {
    
    let modified = moment(modified_at).format("DD-MM-YYYY")
    
    let extendedProps = {
        userId: userId,
        agendaId: agendaId,
        emailAluno: email, 
        telefoneAluno: telefone,
        description: description,
        createdAt: created_at,
        modifiedAt: modified
    }
    return extendedProps
}

get.time = (timeArray) => {
    let time = []
    for(i = 0; i < timeArray.length; i++) {
        if(timeArray[i] != '') {
            time.push(timeArray[i])
        } 
    }
    return time

}

get.businessHours = async (daysOfWeek, startTime, endTime) => {
    let businessHours = []
    let start = []
    let end = []

    for(i = 0; i < startTime.length; i++) {
        if(startTime[i] != '') {
            start.push(startTime[i])
        } 
    }
    for(i = 0; i < endTime.length; i++) {
        if(endTime[i] != '') {
            end.push(endTime[i])
        } 
    }
    for (i = 0; i <= 6; i++) {
        if (daysOfWeek[i] == null) {
        } else {
            businessHours.push({
                daysOfWeek: daysOfWeek[i],
                startTime: start[i],
                endTime: end[i]
            })
        }
    }
    return businessHours
}

get.endTime = async(start, startTime, duration) => {
    dateTime = moment(`${start}T${startTime}`)
    console.log(dateTime)
    time = moment.duration(duration)
    console.log(time)
    endTime = moment(dateTime).add(time).format("HH:mm")
    
    console.log(endTime)
    return endTime
}

get.createColor =async() => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
}

module.exports = get
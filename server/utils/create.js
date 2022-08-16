// unificação das funções de get dos dados
const create = {}

const moment = require('moment')
moment.locale('pt-br')

create.slug = async (name) => {
    let slug = await name.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/[àÀáÁâÂãäÄÅåª]+/g, 'a')       
        .replace(/[èÈéÉêÊëË]+/g, 'e')       	
        .replace(/[ìÌíÍîÎïÏ]+/g, 'i')       	
        .replace(/[òÒóÓôÔõÕöÖº]+/g, 'o')       	
        .replace(/[ùÙúÚûÛüÜ]+/g, 'u')       	
        .replace(/[ýÝÿŸ]+/g, 'y')       		
        .replace(/[ñÑ]+/g, 'n')       			
        .replace(/[çÇ]+/g, 'c')       		
    return slug
}
//funções específicas das agendas e agendamentos
create.event = async(events) => {
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

create.eventScretInfo= async (events) => {
    const eventos = []

    events.map(evento => {
        
        eventos.push({
            id: evento.id,
            title: 'Horário indisponível',
            allDay: evento.allDay,
            start: moment(`${evento.start}T${evento.startTime}`).format(),
            end: moment(`${evento.end}T${evento.endTime}`).format(),
            backgroundColor: evento.backgroundColor,
            
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
create.businessHours = async(horarios) => {
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
    


create.time = (timeArray) => {
    let time = []
    for(i = 0; i < timeArray.length; i++) {
        if(timeArray[i] != '') {
            time.push(timeArray[i])
        } 
    }
    return time

}

create.endTime = async(start, startTime, duration) => {
    dateTime = moment(`${start}T${startTime}`)
    console.log(dateTime)
    time = moment.duration(duration)
    console.log(time)
    endTime = moment(dateTime).add(time).format("HH:mm")
    
    console.log(endTime)
    return endTime
}

create.color =async() => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
}

module.exports = create
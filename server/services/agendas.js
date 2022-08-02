const { Agenda } = require("../database/models")

const agendasServices = {}

agendasServices.getAllAgendas = async () => {
    const agenda = await Agenda.findAll(
      // //include: [
      // {
      //   association: 'agendas'
      // }
      //]
    )

    return agenda
}
agendasServices.getAgenda = async (id) => {
  const agenda = await Agenda.findOne({
    where: {
      id
    },
    include: [
      {
        association: 'user'
      }
    ]
  })
  return agenda
}

agendasServices.getEventsAgendas = async (id) => {
    const agenda = await Agenda.findOne({
      where: {
        id
      },
      include: [
        {
          association: 'events'
        }
      ]
    })
    const { events } = agenda
    return events|| null
  }
  
  module.exports = agendasServices
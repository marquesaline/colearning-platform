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

agendasServices.getAgendaAgendas = async (id) => {
    const agenda = await Agenda.findOne({
      where: {
        id
      },
      include: [
        {
          association: 'agendas'
        }
      ]
    })
    const { agendas } = agenda
    console.log(agenda)
    return agendas || null
  }
  
  module.exports = agendasServices
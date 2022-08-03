const { when } = require("jquery")
const { Agenda } = require("../database/models")
const { BusinessHours } = require("../database/models")

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
  agendasServices.getBusinessHours = async (id) => {
    const agenda = await Agenda.findOne({
      where: {
        id
      },
      include: [
        {
          association: 'businessHours'
        }
      ]
    })
    const { businessHours } = agenda
    return businessHours || null
  }
  module.exports = agendasServices
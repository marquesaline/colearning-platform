const { Event } = require("../database/models")

const eventsServices = {}

eventsServices.getAllEvents = async () => {
    const event = await Event.findAll(
      // //include: [
      // {
      //   association: 'events'
      // }
      //]
    )

    return event
}
eventsServices.getEvent = async (id) => {
  const event = await Event.findOne({
    where: {
      id
    },
    // include: [
    //   {
    //     association: 'user'
    //   }
    // ]
  })
  return event
}

  module.exports = eventsServices
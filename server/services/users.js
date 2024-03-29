const { User } = require("../database/models")

const usersServices = {}

usersServices.getAllUsers = async () => {
    const user = await User.findAll(
      // //include: [
      // {
      //   association: 'agendas'
      // }
      //]
    )

    return user
}
usersServices.getUser = async (id) => {
  const user = await User.findOne({
    where: {
      id
    },
    include: [
      { association: 'agendas'},
      { association: 'events' }
    ],
    force: true
  })
  return user
}
usersServices.getUserByEmail = async(email) => {
  const user = await User.findOne({
    where: {
      email
    }
  })
  return user
}
usersServices.getUserSlug = async(slug) => {
  const user = await User.findOne({
    where: {
      slug
    }
  })
  return user
}

usersServices.getUserAgendas = async (id) => {
    const user = await User.findOne({
      where: {
        id
      },
      include: [
        {
          association: 'agendas'
        }
      ]
    })
    const { agendas } = user
    return agendas || null
  }

  usersServices.getUserEvents = async (id) => {
    const user = await User.findOne({
      where: {
        id
      },
      include: [
        {
          association: 'events'
        }
      ], 
      force: true
    })
    const { events } = user
    return events || null
  }
  
  
  module.exports = usersServices
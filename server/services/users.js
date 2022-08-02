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
    // include: [
    //   {
    //     association: 'agendas'
    //   }
    // ]
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
  
  module.exports = usersServices
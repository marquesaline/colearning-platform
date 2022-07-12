// unificação das funções de get dos dados
const helper = require("./helper")

const get = {}

get.agenda = JSON.parse(helper.read("agenda.json"))
get.events = JSON.parse(helper.read("events.json"))
get.users = JSON.parse(helper.read("users.json"));

// get.byId = async (database, id) => {
//     await database.find((info) => info.id == id)
// }

module.exports = get
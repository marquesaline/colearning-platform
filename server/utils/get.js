// unificação das funções de get dos dados
const helper = require("./helper")

const get = {}

get.agenda = JSON.parse(helper.read("agenda.json"))
get.events = JSON.parse(helper.read("events.json"))
get.users = JSON.parse(helper.read("users.json"));

get.nextById = async (database) => {
    const data = await database
    const newId = parseInt(data[data.length - 1].id) + 1;
    return newId;
}



module.exports = get
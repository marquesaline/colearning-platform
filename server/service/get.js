// unificação das funções de get dos dados
const helper = require("./helper")

const get = {}
const moment = require('moment')
moment.locale('pt-br')

get.agenda = JSON.parse(helper.read("agenda.json"))
get.events = JSON.parse(helper.read("events.json"))
get.users = JSON.parse(helper.read("users.json"));

get.nextById = async (database) => {
    const data = await database
    const newId = parseInt(data[data.length - 1].id) + 1;
    return newId;
}
get.byId = async(database, id) => 
    await database.find((info) => info.id == id)

get.extendedCreatAgendas = async(userId, created_at, modified_at) => {
    let created = moment(created_at).format("DD-MM-YYYY")
    let modified = moment(modified_at).format("DD-MM-YYYY")
    let extendedProps = {
        userId: userId,
        createdAt: created,
        modifiedAt: modified
    }
    return extendedProps
}

get.BusinessHours = async (daysOfWeek, startTime, endTime) => {
    let businessHours = []
    for (i = 0; i <= 6; i++) {
        if (daysOfWeek[i] == null) {
        } else {
            businessHours.push({
                daysOfWeek: daysOfWeek[i],
                startTime: startTime[i],
                endTime: endTime[i]
            })
        }
    }
    return businessHours
}



module.exports = get
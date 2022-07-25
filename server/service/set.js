const helper = require("./helper")

const set = {}
set.users = (users) => helper.write("users.json", users)
set.agendas = (agendas) => helper.write("agenda.json", agendas);
set.events = (events) => helper.write("events.json", events)


module.exports = set
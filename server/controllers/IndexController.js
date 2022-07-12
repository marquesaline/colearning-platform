const fs = require("fs");
const path = require("path");

const get = require("../utils/get")
const getAgendas = get.users
const getAgendaId = (id) =>
    getAgendas.find((agenda) => agenda.id == id)
const getUsers = get.users
const getUserId = async (id) => await getUsers.find((user) => user.id == id);

const controller = {
    index: (req, res) => res.render('index', { title: 'CoLearning' }),
    contact: (req, res) => res.render('contato', { title: 'Contato - CoLearning' }),
    register: (req, res) => res.render('cadastro', { title: 'Cadstro - CoLearning ' }),
    login: (req, res) => res.render('login', { title: 'Login - CoLearning' }),
    plans: (req, res) => res.render('planos', { title: 'Planos - CoLearning' }),
    agendamento: async (req, res) => {
        
        const user = await getUserId(req.params.id)
        console.log(user.name)
        var sluger = await slug(user.name)
        console.log(sluger)
        res.render("agendamento",  {
            title: `Agendamento ${user.nome}`
        })
    }
}

module.exports = controller
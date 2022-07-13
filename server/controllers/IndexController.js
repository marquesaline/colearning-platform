const fs = require("fs");
const path = require("path");

const get = require("../utils/get")
const getAgendas = get.agenda
const getAgendaId = (id) =>
    getAgendas.find((agenda) => agenda.id == id)
const getUsers = get.users
const getUserSlug = async (slug) => await getUsers.find((user) => user.slug == slug);

const controller = {
    index: (req, res) => res.render('index', { title: 'CoLearning' }),
    contact: (req, res) => res.render('contato', { title: 'Contato - CoLearning' }),
    register: (req, res) => res.render('cadastro', { title: 'Cadstro - CoLearning ' }),
    login: (req, res) => res.render('login', { title: 'Login - CoLearning' }),
    plans: (req, res) => res.render('planos', { title: 'Planos - CoLearning' }),
    agendas: async (req, res) => {
        
        const user = await getUserSlug(req.params.slug)
        const idUser = user.id
        const agendas = await getAgendas
        res.render("agendas",  {
            title: `Agendas - ${user.nome}`,
            user,
            agendas,
            idUser
        })
    },
    showAgenda: async (req, res) => {
        const user = await getUserSlug(req.params.slug)
        const idUser = user.id
        const agenda = await getAgendaId(req.params.id)
        const businessHours = JSON.stringify(agenda.businessHours)
        
        res.render("agenda", {
            title: `${agenda.title} - ${user.nome}`,
            agenda,
            user,
            idUser,
            businessHours
            
        })
    },
    jsonAgenda: async (req, res) => {
        res.json(await getAgendaId(req.params.id))
    }
}

module.exports = controller
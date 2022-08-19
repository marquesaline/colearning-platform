const { Contact } = require('../database/models')
const controller = {}

controller.index = (req, res) => res.render('index', { title: 'CoLearning' }),
controller.contact = (req, res) => res.render('contato', { title: 'Contato - CoLearning' }),
controller.createContact = async(req, res) => {
    const { 
        nome, 
        email, 
        telefone, 
        assunto,
        mensagem, 
        created_at, 
        updated_at 
    } = req.body

    await Contact.create({
        nome, 
        email, 
        telefone,
        assunto,
        mensagem, 
        createdAt: created_at,
        updateAt: updated_at
    })
    res.render('contato', { 
        title: 'Contato - CoLearning',
        message: 'Contato enviado com sucesso!'
    })
},
controller.register = (req, res) => res.render('cadastro', { title: 'Cadastro - CoLearning ' }),
controller.login = (req, res) => res.render('login', { title: 'Login - CoLearning' }),
controller.about = (req, res) => res.render('sobre', { title: 'Sobre - CoLearning' }),


module.exports = controller
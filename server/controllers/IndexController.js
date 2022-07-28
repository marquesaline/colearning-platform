
const controller = {
    index: (req, res) => res.render('index', { title: 'CoLearning' }),
    contact: (req, res) => res.render('contato', { title: 'Contato - CoLearning' }),
    register: (req, res) => res.render('cadastro', { title: 'Cadstro - CoLearning ' }),
    login: (req, res) => res.render('login', { title: 'Login - CoLearning' }),
    about: (req, res) => res.render('sobre', { title: 'Sobre - CoLearning' }),
    
    
}

module.exports = controller
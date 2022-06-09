const controller = {
    index: (req, res) => res.render('index', { title: 'CoLearning' }),
    contact: (req, res) => res.render('contato', { title: 'Contato - CoLearning' }),
    register: (req, res) => res.render('cadastro', { title: 'Cadstro - CoLearning ' }),
    login: (req, res) => res.render('login', { title: 'Login - CoLearning' }),
    plans: (req, res) => res.render('planos', { title: 'Planos - CoLearning' })
}

module.exports = controller
const controller = {
    index: (req, res) => res.render('index', { title: 'CoLearning' }),
    contact: (req, res) => res.render('contato', { title: 'CoLearning - Contato' }),
    register: (req, res) => res.render('cadastro', { title: 'CoLearning - Cadastro' }),
    login: (req, res) => res.render('login', { title: 'CoLearning - Login' }),
    plans: (req, res) => res.render('planos', { title: 'CoLearning - Planos' })
}

module.exports = controller
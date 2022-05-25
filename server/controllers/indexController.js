const controller = {
    index: (req, res) => res.render('index', { title: 'CoLearning' }),
    contato: (req, res) => res.render('contato', { title: 'CoLearning - Contato' }),
    cadastro: (req, res) => res.render('cadastro', { title: 'CoLearning - Cadastro' }),
    login: (req, res) => res.render('login', { title: 'CoLearning - Login' }),
    planos: (req, res) => res.render('planos', { title: 'CoLearning - Planos' })
}

module.exports = controller
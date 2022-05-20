const controller = {
    index: (req, res) => res.render('index'),
    contato: (req, res) => res.render('contato'),
    cadastro: (req, res) => res.render('cadastro'),
    login: (req, res) => res.render('login'),
    planos: (req, res) => res.render('planos')
}

module.exports = controller
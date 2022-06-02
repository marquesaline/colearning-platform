

const controller = {
    calendar: (req, res) => res.render('calendario', { title: 'Calendário' }),
    create: (req, res) => res.render('criar-agenda', { title: 'Criar Agenda' }),
    account: (req, res) => res.render('minha-conta', { title: 'Minha Conta'}),
    signature: (req, res) => res.render('assinatura')
    
    
}

module.exports = controller
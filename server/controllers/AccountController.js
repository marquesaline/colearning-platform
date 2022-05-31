const controller = {
    calendar: (req, res) => res.render('calendario', { title: 'Calendário' }),
    create: (req, res) => res.render('criar-agenda', { title: 'Criar Agenda' }),
    
}

module.exports = controller
const controller = {
    calendario: (req, res) => res.render('calendario', { title: 'Calendário' }),
    criar: (req, res) => res.render('criar-agenda', { title: 'Criar Agenda' }),
    
}

module.exports = controller
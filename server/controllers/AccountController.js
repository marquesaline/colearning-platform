const controller = {}


controller.calendar = (req, res) => res.render('calendario', { title: 'Calendário' }),
controller.create = (req, res) => res.render('criar-agenda', { title: 'Criar Agenda' }),
controller.account = (req, res) => res.render('minha-conta', { title: 'Minha Conta'}),
controller.signature = (req, res) => res.render('assinatura', { title: 'Assinatura'})
controller.editAccount = (req, res) => {

    res.render('minha-conta-editar', {
        title: 'Editar - Minha Conta'
    })
}

controller.editSignature = (req, res) => {

    res.render('assinatura-editar', {
        title: 'Editar - Assinatura'
    })
}
    
    


module.exports = controller
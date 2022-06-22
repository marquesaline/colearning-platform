const controller = {}
const fs = require("fs");
const path = require("path");

const helper = {};

helper.read = (fileName) =>
  fs.readFileSync(path.join(__dirname, `../data/${fileName}`), "utf-8");


const getAgenda = () => JSON.parse(helper.read("agenda.json"))
const getAgendaPorId = (id) =>
    getAgenda().find((agenda) => agenda.id == id)


// Controllers
// acesso ao json
controller.agenda = async (req, res) => res.json(await getAgenda())

//acessar as agendas
controller.calendar = (req, res) => res.render('calendario', {
    title: 'Calendário' ,
    agenda: getAgendaPorId(req.params.id)
}),


controller.create = (req, res) => res.render('criar-agenda', { title: 'Criar Agenda' }),
controller.account = (req, res) => res.render('minha-conta', { title: 'Minha Conta'}),
controller.editAccount = (req, res) => {
    res.render('minha-conta-editar', {
        title: 'Editar - Minha Conta'
    })
},
controller.signature = (req, res) => res.render('assinatura', { title: 'Assinatura'})
controller.editSignature = (req, res) => {
    res.render('assinatura-editar', {
        title: 'Editar - Assinatura'
    })
}
    
    


module.exports = controller
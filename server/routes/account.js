var express = require('express');
var router = express.Router();
const controllerUser = require('../controllers/UserControllers')
const controllerAgenda = require('../controllers/AgendaController')
const validator = require('../middlewares/validadeRegister')
const loggedUser = require('../middlewares/loggedUser')

router.get('/', loggedUser.isNotLogged, controllerAgenda.calendar)
router.get('/:agendaId',  loggedUser.isNotLogged, controllerAgenda.agenda)

router.get('/minha-conta',  loggedUser.isNotLogged, controllerUser.showAccount) //dando erro
router.get('/minha-conta/editar',  loggedUser.isNotLogged, controllerUser.editAccount)
router.put('/minha-conta/editar', validator, controllerUser.updateAccount)

router.get('/criar-agenda', loggedUser.isNotLogged, controllerAgenda.addAgenda) //dando erro
router.post('/criar-agenda', controllerAgenda.createAgenda)

router.get('/:agendaId/editar-agenda',  loggedUser.isNotLogged, controllerAgenda.editAgenda)
router.put('/:agendaId/editar-agenda', controllerAgenda.updateAgenda)

router.get('/:id/:agendaId/apagar-agenda',  loggedUser.isNotLogged, controllerAgenda.removeAgenda)
router.delete('/:id/:agendaId/apagar-agenda', controllerAgenda.deleteAgenda)


router.get('/logout',  loggedUser.isNotLogged, controllerUser.logout)

module.exports = router;
var express = require('express');
var router = express.Router();
const controllerUser = require('../controllers/UserControllers')
const controllerAgenda = require('../controllers/AgendaController')
const validator = require('../middlewares/validadeRegister')
const isNotLogged = require('../middlewares/isNotLogged')

router.get('/', isNotLogged, controllerAgenda.calendar)
router.get('/:agendaId',  isNotLogged, controllerAgenda.agenda)

router.get('/minha-conta',  isNotLogged, controllerUser.showAccount) //dando erro
router.get('/minha-conta/editar',  isNotLogged, controllerUser.editAccount)
router.put('/minha-conta/editar', validator, controllerUser.updateAccount)

router.get('/criar-agenda', isNotLogged, controllerAgenda.addAgenda) //dando erro
router.post('/criar-agenda', controllerAgenda.createAgenda)

router.get('/:agendaId/editar-agenda',  isNotLogged, controllerAgenda.editAgenda)
router.put('/:agendaId/editar-agenda', controllerAgenda.updateAgenda)

router.get('/:id/:agendaId/apagar-agenda',  isNotLogged, controllerAgenda.removeAgenda)
router.delete('/:id/:agendaId/apagar-agenda', controllerAgenda.deleteAgenda)


router.get('/logout',  isNotLogged, controllerUser.logout)

module.exports = router;
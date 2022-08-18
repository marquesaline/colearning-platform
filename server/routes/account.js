var express = require('express');
var router = express.Router();
const controllerUser = require('../controllers/UserControllers')
const controllerAgenda = require('../controllers/AgendaController')
const avatar = require('../middlewares/AvatarUpload')
const validator = require('../middlewares/ValidatorRegister')
const loggedUser = require('../middlewares/LoggedUser')

router.get('/', loggedUser.isNotLogged, controllerAgenda.calendar)


router.get('/minha-conta',  loggedUser.isNotLogged, controllerUser.showAccount) //dando erro
router.get('/minha-conta/editar',  loggedUser.isNotLogged, controllerUser.editAccount)
router.put('/minha-conta/editar', avatar.upload, validator, controllerUser.updateAccount)

router.get('/criar-agenda', loggedUser.isNotLogged, controllerAgenda.addAgenda) //dando erro
router.post('/criar-agenda', controllerAgenda.createAgenda)

router.get('/:agendaId/editar-agenda',  loggedUser.isNotLogged, controllerAgenda.editAgenda)
router.put('/:agendaId/editar-agenda', controllerAgenda.updateAgenda)

router.get('/:id/:agendaId/apagar-agenda',  loggedUser.isNotLogged, controllerAgenda.removeAgenda)
router.delete('/:id/:agendaId/apagar-agenda', controllerAgenda.deleteAgenda)

router.get('/sair',  loggedUser.isNotLogged, controllerUser.logout)

router.get('/:agendaId',  loggedUser.isNotLogged, controllerAgenda.agenda)


module.exports = router;
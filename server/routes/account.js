var express = require('express');
var router = express.Router();
const controllerUser = require('../controllers/UserControllers')
const controllerAgenda = require('../controllers/AgendaController')
const middlewares = require('../middlewares/AvatarUpload')

router.get('/:id', controllerAgenda.calendar)

router.get('/:id/minha-conta', controllerUser.showAccount)
router.get('/:id/minha-conta/editar',controllerUser.editAccount)
router.put('/:id/minha-conta/editar', middlewares.upload, controllerUser.updateAccount)

router.get('/:id/criar-agenda', controllerAgenda.addAgenda)
router.post('/:id/criar-agenda', controllerAgenda.createAgenda)

router.get('/:id/:agendaId/editar-agenda', controllerAgenda.editAgenda)
router.put('/:id/:agendaId/editar-agenda', controllerAgenda.updateAgenda)

router.get('/:id/:agendaId/apagar-agenda', controllerAgenda.removeAgenda)
router.delete('/:id/:agendaId/apagar-agenda', controllerAgenda.deleteAgenda)

// router.get('/json', controllerAccount.events)
// router.get('/json/:id', controllerAccount.eventsId)

module.exports = router;
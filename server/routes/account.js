var express = require('express');
var router = express.Router();
const controllerAccount = require('../controllers/AccountController')
const controllerAgenda = require('../controllers/AgendaController')

router.get('/:userId', controllerAccount.calendar)

router.get('/:userId/minha-conta', controllerAccount.account)
// router.get('/assinatura', controllerAccount.signature)

// Falta inserir o ID 
router.get('/:userId/minha-conta/editar',controllerAccount.editAccount)
// router.get('/assinatura/editar', controllerAccount.editSignature)

router.get('/:userId/criar-agenda', controllerAgenda.addAgenda)
router.post('/:userId/criar-agenda', controllerAgenda.createAgenda)
router.get('/:userId/:agendaId/editar-agenda', controllerAgenda.editAgenda)
router.put('/:userId/:agendaId/editar-agenda', controllerAgenda.updateAgenda)
router.get('/:userId/:agendaId/apagar-agenda', controllerAgenda.removeAgenda)
router.delete('/:userId/:agendaId/apagar-agenda', controllerAgenda.deleteAgenda)

router.get('/json', controllerAccount.events)
router.get('/json/:id', controllerAccount.eventsId)

module.exports = router;
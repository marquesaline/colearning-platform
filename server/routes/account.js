var express = require('express');
var router = express.Router();
const controllerAccount = require('../controllers/AccountController')


router.get('/', controllerAccount.calendar)

router.get('/minha-conta', controllerAccount.account)
router.get('/assinatura', controllerAccount.signature)

// Falta inserir o ID 
router.get('/minha-conta/editar',controllerAccount.editAccount)
router.get('/assinatura/editar', controllerAccount.editSignature)

router.get('/criar-agenda', controllerAccount.addAgenda)
router.post('/criar-agenda', controllerAccount.createAgenda)
router.get('/:id/editar', controllerAccount.editAgenda)
router.put('/:id/editar', controllerAccount.updateAgenda)
router.get('/:id/apagar', controllerAccount.removeAgenda)
router.delete('/:id/apagar', controllerAccount.deleteAgenda)

router.get('/json', controllerAccount.events)
router.get('/json/:id', controllerAccount.eventsId)

module.exports = router;
var express = require('express');
var router = express.Router();
const controllerAccount = require('../controllers/AccountController')


router.get('/:userId', controllerAccount.calendar)

router.get('/:userId/minha-conta', controllerAccount.account)
// router.get('/assinatura', controllerAccount.signature)

// Falta inserir o ID 
router.get('/:userId/minha-conta/editar',controllerAccount.editAccount)
// router.get('/assinatura/editar', controllerAccount.editSignature)

router.get('/:userId/criar-agenda', controllerAccount.addAgenda)
router.post('/:userId/criar-agenda', controllerAccount.createAgenda)
router.get('/:userId/editar-agenda', controllerAccount.editAgenda)
router.put('/:userId/editar-agenda', controllerAccount.updateAgenda)
router.get('/:userId/apagar-agenda', controllerAccount.removeAgenda)
router.delete('/:userId/apagar-agenda', controllerAccount.deleteAgenda)

router.get('/json', controllerAccount.events)
router.get('/json/:id', controllerAccount.eventsId)

module.exports = router;
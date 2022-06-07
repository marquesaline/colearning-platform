var express = require('express');
var router = express.Router();
const controller = require('../controllers/AccountController')


router.get('/', controller.calendar)
router.get('/criar-agenda', controller.create)
router.get('/minha-conta', controller.account)
router.get('/minha-conta/assinatura', controller.signature)

// Falta inserir o ID 
router.get('/minha-conta/editar', controller.editAccount)
router.get('/assinatura/editar', controller.editSignature)

module.exports = router;
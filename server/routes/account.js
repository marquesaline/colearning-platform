var express = require('express');
var router = express.Router();
const controller = require('../controllers/AccountController')


router.get('/', controller.calendar)
router.get('/criar-agenda', controller.create)
router.get('/minha-conta', controller.account)
router.get('/minha-conta/assinatura', controller.signature)



module.exports = router;
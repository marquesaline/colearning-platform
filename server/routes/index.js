var express = require('express');
var router = express.Router();
const controller = require('../controllers/indexController')


router.get('/', controller.index)
router.get('/contato', controller.contato)
router.get('/cadastro', controller.cadastro)
router.get('/login', controller.login)
router.get('/planos', controller.login)


module.exports = router;

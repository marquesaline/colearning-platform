var express = require('express');
var router = express.Router();
const controllerIndex = require('../controllers/IndexController')
const controllerUser = require('../controllers/UserControllers')
const validator = require('../middlewares/validadeRegister')
const loggedUser = require('../middlewares/loggedUser')

router.get('/', controllerIndex.index)

router.get('/contato', controllerIndex.contact)
router.post('/cadastro', validator, controllerUser.create)

router.get('/cadastro', loggedUser, controllerIndex.register)

router.get('/login', loggedUser, controllerIndex.login)
router.post('/login', controllerUser.loginProcess)

router.get('/sobre', controllerIndex.about)

router.get('/sucesso', function(req, res, next) {
    res.render('sucesso', { title: 'Deu certo' });
});



module.exports = router;

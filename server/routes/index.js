var express = require('express');
var router = express.Router();
const controller = require('../controllers/IndexController')


router.get('/', controller.index)
router.get('/contato', controller.contact)
router.get('/cadastro', controller.register)
router.get('/login', controller.login)
router.get('/planos', controller.plans)
router.get('/sucesso', function(req, res, next) {
    res.render('sucesso', { title: 'Parabéns! Deu bom!' });
});
router.get('/agendamento/:slug', controller.agendas)
router.get('/agendamento/:slug/:id', controller.showAgenda)
router.get("/json/:id", controller.jsonAgenda)
module.exports = router;

var express = require('express');
var router = express.Router();
const controllerAgendas = require('../controllers/AgendaController')


router.get('/:slug', controllerAgendas.agendas)
router.get('/:slug/:id', controllerAgendas.showAgenda)


module.exports = router
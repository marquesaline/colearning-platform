var express = require('express');
var router = express.Router();
const controllerAgendas = require('../controllers/AgendaController')


router.get('/:slug', controllerAgendas.agendas)
router.get('/:slug/:id', controllerAgendas.showAgenda)

router.post('/:slug/:id', controllerAgendas.createEvent)

module.exports = router
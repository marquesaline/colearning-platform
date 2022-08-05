var express = require('express');
var router = express.Router();
const controllerEvents = require('../controllers/EventsController')


router.get('/:slug', controllerEvents.agendas)
router.get('/:slug/:id', controllerEvents.showAgenda)

router.post('/:slug/:id', controllerEvents.createEvent)

module.exports = router
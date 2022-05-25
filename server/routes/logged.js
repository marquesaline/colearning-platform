var express = require('express');
var router = express.Router();
const controller = require('../controllers/loggedController')


router.get('/calendario', controller.calendario)
router.get('/criar-agenda', controller.criar)



module.exports = router;
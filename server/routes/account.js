var express = require('express');
var router = express.Router();
const controller = require('../controllers/AccountController')


router.get('/', controller.calendar)
router.get('/criar-agenda', controller.create)



module.exports = router;
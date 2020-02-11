var controller = require('../controller/usuario')
var express = require('express');
var router = express.Router();

router.post('/login',controller.login)
router.get('/',controller.getAll)
router.get('/:id',controller.getById)
router.post('/',controller.registrar)
router.delete('/:id',controller.remove)
router.put('/:id',controller.update)


module.exports = router;
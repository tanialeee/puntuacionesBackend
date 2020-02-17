var controller = require('../controller/usuario')
var express = require('express');
var router = express.Router();
var verificacionToken = require('./verificacionToken')

router.get('/',/*verificacionToken.validarToken,*/controller.getAll) //lista todos los usuarios
router.get('/:id',controller.getById)  //muestra los datos de un usuario
router.post('/',controller.registrar)  //registra un nuevo usuario
router.post('/login',controller.login) //login del usuario(obtiene el token)
router.delete('/:id',controller.remove) //borra un usuario
router.put('/:id',controller.update) //modifica un usuario
router.post('/:id/puntuacion',controller.insertaPuntuacion)// Añadir una puntuacion a un usuario en particular
//router.get('/:id/puntuaciones')// Obtener las puntuaciones que tiene un usuario en particular
// Borrar una puntuacion a un usuario en particular

//Obtener las puntuaciones que tiene un usuario en particular
//Usar findByIdD
router.get('/:id/puntuacion',controller.getPuntuacionesUsuario)

// Borra una puntuacion a un usuario en particular


module.exports = router;
//var Puntuacion = require('../models/puntuacion')
var Usuario = require('../models/usuario')
var Joi = require('@hapi/joi')
var bcrypt = require('bcrypt')

const schemaRegistrar = Joi.object({
    nombre: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    //repeat_password: Joi.ref('password'),
    email: Joi.string().email()
})

const schemaLogin = Joi.object({
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    //repeat_password: Joi.ref('password'),
    email: Joi.string().email()
})



async function getAll(req,res){
  //Async/await
  try{
  let usuarios = await Usuario.find()
    res.status(200).send({accion:'get all', datos:usuarios})
  }catch(err){
    res.status(500).send({accion:'get all', mensaje:`error al obtener los usuarios ${err}`})
     }
  }

async function login(req,res){
    // Validar todos los campos
    try{
        const {error,value} = await schemaLogin.validateAsync(req.body)
     }catch(err){
        return res.status(404).send({accion:'login',mensaje:`Error en el usuario/contraseña` })
     }

    // Comprobar si el usuario existe
    let usuarioEncontrado =await Usuario.findOne({email:req.body.email })
    if(!usuarioEncontrado)return res.status(400).send({accion:'login',mensaje:`Error en el usuario/contraseña` });

    // Comprobar si el password coincide
     const passwordValidado = await bcrypt.compare(req.body.password,usuarioEncontrado.password)
     if(!passwordValidado)return res.status(400).send({accion:'login',mensaje:`Error en el usuario/contraseña` });

    // Crear y devolver el token

}
  
async function registrar(req,res){

      //Async/await
 try{
    //Validar todos los campos
    const {error,value} = await schemaRegistrar.validateAsync(req.body)
 }catch(err){
    return res.status(404).send({accion:'save',mensaje:`Error al validar el usuario ${err}` })
 }
    
    //Comprobar que el usuario no existe antes en la BD
    let usuarioEncontrado =await Usuario.findOne({email:req.body.email })
    if(usuarioEncontrado)return res.status(400).send({accion:'save',mensaje:`Error el usuario ya existe` });

    //El password nunca se guarda en texto claro dentro de la BD
    const salt = await bcrypt.genSalt(10)
    const passwordEncriptado = await bcrypt.hash(req.body.password,salt)
    //Insertar(registrar) el usuario en la BD
   
    try{
    var usuario = new Usuario(req.body);
    usuario._id = undefined;
    usuario.password=passwordEncriptado;
    let usuarioGuardado = await usuario.save()
      res.status(200).send({accion:'save', datos:usuarioGuardado})
    }catch(err){
      res.status(500).send({accion:'save', mensaje:`Error al registrar el usuario ${err}`})
       }
  

  }


 async function remove(req,res){

    
    try{
        let usuarioId= req.params.id;
        let usuarioBorrado = await Usuario.findByIdAndRemove(usuarioId)
        if(!usuarioBorrado){
            return res.status(404).send({accion:'delete',mensaje:'Error el id a borrar no existe'})
        }
            res.status(200).send({accion:'remove', datos:usuarioBorrado})
        
         
        }catch(err){
          res.status(500).send({accion:'remove', mensaje:`Error al borrar el usuario ${err}`})
           }
    
  }

  async function update(req,res){
   
    try{
        var datos = req.body;
        let usuarioId= req.params.id;
        let usuarioActualizado = await Usuario.findByIdAndUpdate(usuarioId,datos)
        if(!usuarioActualizado){
            return res.status(404).send({accion:'update',mensaje:'Error el id a actualizar no existe'})
        }
            res.status(200).send({accion:'update', datos:usuarioActualizado})
        
       
        }catch(err){
          res.status(500).send({accion:'update', mensaje:`Error al modificar el usuario ${err}`})
           }

  }


  async function getById (req,res){
  

  try{
    let usuarioId= req.params.id;
    let usuario = await Usuario.findById(usuarioId)
      res.status(200).send({accion:'get one', datos:usuario})
    }catch(err){
      res.status(500).send({accion:'get one', mensaje:`error al obtener el usuario ${err}`})
       }

  
    
  }

  module.exports = {login,getAll,getById,registrar,remove,update}
  

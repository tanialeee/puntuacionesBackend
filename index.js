var express = require('express');
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
var Puntuacion = require('./models/puntuacion')

var app = express();
//Preparo body parser para que tranforme las peticiones de texto a json.
app.use(bodyParser.urlencoded( {extended:false} ) )
app.use(bodyParser.json())

app.get('/', (req,res)=>{
  res.status(200).send("Hola Tania");
})

app.get('/puntuaciones/', (req,res)=>{
  //leer la base de datos select.
Puntuacion.find().exec((err,puntuaciones)=>{
  if(err){
    res.status(500).send({accion:'get all', mensaje:'error al obtener la puntuacion'})
  }else{
    res.status(200).send({accion:'get all', datos:puntuaciones})
  }
})
  /*let datosJSON = {
      accion:'get all',
      datos: [
        {nombre:'pepe',puntuacion:33},
        {nombre:'bea',puntuacion:23},
        {nombre:'Felix',puntuacion:29}
      ]
  }
  res.status(200).send(datosJSON)*/
})


app.post('/puntuacion',(req,res)=>{
  var datos = req.body;
  // insertar en la base de datos insert.

    var datos = req.body;
    var puntuacion = new Puntuacion();
    puntuacion.nombre = datos.nombre;
    puntuacion.puntuacion = datos.puntuacion;
    puntuacion.save( (err,puntuacionGuardada)=>{
      if(err){
        res.status(500).send({accion:'save',mensaje:'Error al guardar la puntuacion'})
      }else{
        res.status(200).send({accion:'save',datos:puntuacionGuardada})
      }
    })

  /*let datosJsonRespuesta={
    accion:'save',
    datos: datos
  }
  res.status(200).send(datosJsonRespuesta)*/

})


app.delete('/puntuacion/:id',(req,res)=>{

  let puntuacionId= req.params.id;
  Puntuacion.findByIdAndDelete(puntuacionId,(err,puntuacionBorrada)=>{
    if(err){
      res.status(500).send({accion:'delete',mensaje:'Error al borrar la puntuacion'})
    }if(!puntuacionBorrada){
      res.status(404).send({accion:'delete',mensaje:'Error el id a borrar no existe'})
    
    }else{
      res.status(200).send({accion:'delete',datos:puntuacionBorrada})
    }
  })

  /*let puntuacionId = req.params.id;
  let datosJsonRespuesta = {
  accion:'delete',
  datos: puntuacionId
 } 
 //TODO: borrar de la base de datos el id
 res.status(200).send(datosJsonRespuesta)*/
});



mongoose.connect('mongodb://192.168.99.100:27017/scores',(err,res)=>{
  if(err){
    console.log("Error al conectarme a la base de datos")
    throw err
  }else{
    console.log("Conexion correcta a mongoDB")

    app.listen(5200, ()=>{
      console.log("API REST funcioonando en http://localhost:5200")
    })


  }
  
})

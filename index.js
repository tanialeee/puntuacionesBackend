var express = require('express');
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
var routerPuntuacion = require('./routers/puntuacion')
var cors= require('cors')
var morgan=require('morgan')
var dotenv = require('dotenv')

var app = express();
dotenv.config();



//Preparo body parser para que tranforme las peticiones de texto a json.
app.use(bodyParser.urlencoded( {extended:false} ) )
app.use(bodyParser.json())

app.use( cors() )
app.use(morgan('dev'))
app.use('/puntuacion', routerPuntuacion)


// Configurar cabeceras y cors
/*app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});*/


//TODO:quitar(pero me da pena :(    ).
app.get('/', (req,res)=>{
  res.status(200).send("Hola Tania");
})

//TODO: login


/*mongoose.connect('mongodb://192.168.99.100:27017/scores',{useNewUrlParser: true,useUnifiedTopology: true },(err,res)=>{
  if(err){
    console.log("Error al conectarme a la base de datos")
    throw err
  }else{
    console.log("Conexion correcta a mongoDB")

    app.listen(5200, ()=>{
      console.log("API REST funcioonando en http://localhost:5200")
    })


  }
  
})*/
const run = async()=>{
  await mongoose.connect(process.env.URL_BASEDATOS,{useNewUrlParser: true,useUnifiedTopology: true })
  await app.listen(process.env.PUERTO_SERVIDOR)
    console.log("Servidor y base de datos arrancados");

}
run().catch(err => console.error("Faallo al arrancar: "+err))
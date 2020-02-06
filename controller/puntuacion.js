var Puntuacion = require('../models/puntuacion')

async function getAll(req,res){
    //Callbacks
    //leer la base de datos select.
 /* Puntuacion.find().exec((err,puntuaciones)=>{
    if(err){
      res.status(500).send({accion:'get all', mensaje:'error al obtener la puntuacion'})
    }else{
      res.status(200).send({accion:'get all', datos:puntuaciones})
    }
  })*/

  //Promesas
  /*Puntuacion.find({}).exec()
    .then(puntuaciones => res.status(200).send({accion:'get all', datos:puntuaciones}))
    .catch(err=> res.status(500).send({accion:'get all', mensaje:`error al obtener la puntuacion ${err}`}))*/
    

  //Async/await
  try{
  let puntuaciones = await Puntuacion.find()
    res.status(200).send({accion:'get all', datos:puntuaciones})
  }catch(err){
    res.status(500).send({accion:'get all', mensaje:`error al obtener la puntuacion ${err}`})
     }
  }


  
async function insert(req,res){
    /*var datos = req.body;
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
      })*/

      //Async/await
  try{
    var puntuacion = new Puntuacion(req.body);
    let puntuacionGuardada = await puntuacion.save()
      res.status(200).send({accion:'save', datos:puntuacionGuardada})
    }catch(err){
      res.status(500).send({accion:'save', mensaje:`Error al guardar la puntuacion ${err}`})
       }
  

  }


 async function remove(req,res){

    //let puntuacionId= req.params.id;
    /*Puntuacion.findByIdAndDelete(puntuacionId,(err,puntuacionBorrada)=>{
      if(err){
        res.status(500).send({accion:'delete',mensaje:'Error al borrar la puntuacion'})
      }else if(!puntuacionBorrada){
        res.status(404).send({accion:'delete',mensaje:'Error el id a borrar no existe'})
      
      }else{
        res.status(200).send({accion:'delete',datos:puntuacionBorrada})
      }
    })*/

    
    try{
        let puntuacionId= req.params.id;
        let puntuacionBorrada = await Puntuacion.findByIdAndRemove(puntuacionId)
        if(!puntuacionBorrada){
            return res.status(404).send({accion:'delete',mensaje:'Error el id a borrar no existe'})
        }
            res.status(200).send({accion:'remove', datos:puntuacionBorrada})
        
         
        }catch(err){
          res.status(500).send({accion:'remove', mensaje:`Error al borrar la puntuacion ${err}`})
           }
    
  }

  async function update(req,res){
    /*var datos = req.body;
    let puntuacionId= req.params.id;
    Puntuacion.findByIdAndUpdate(puntuacionId,datos,(err, puntuacionActualizada)=>{
      if(err){
        res.status(500).send({accion:'update',mensaje:'Error al modificar la puntuacion'})
      }else if(!puntuacionActualizada){
        res.status(404).send({accion:'update',mensaje:'Error el id a actualizar no existe'})
      }else{
        res.status(200).send({accion:'update',datos:puntuacionActualizada})
      }
    })*/
    try{
        var datos = req.body;
        let puntuacionId= req.params.id;
        let puntuacionActualizada = await Puntuacion.findByIdAndUpdate(puntuacionId,datos)
        if(!puntuacionActualizada){
            return res.status(404).send({accion:'update',mensaje:'Error el id a actualizar no existe'})
        }
            res.status(200).send({accion:'update', datos:puntuacionActualizada})
        
       
        }catch(err){
          res.status(500).send({accion:'update', mensaje:`Error al modificar la puntuacion ${err}`})
           }

  }


  async function getById (req,res){
   /* let puntuacionId= req.params.id;
    //leer la base de datos select.
  Puntuacion.findById(puntuacionId).exec((err,puntuacion)=>{
    if(err){
      res.status(500).send({accion:'get one', mensaje:'error al obtener la puntuacion'})
    }else{
      res.status(200).send({accion:'get one', datos:puntuacion})
    }
  })*/

  try{
    let puntuacionId= req.params.id;
    let puntuacion = await Puntuacion.findById(puntuacionId)
      res.status(200).send({accion:'get one', datos:puntuacion})
    }catch(err){
      res.status(500).send({accion:'get one', mensaje:`error al obtener la puntuacion ${err}`})
       }

  
    
  }

  module.exports = {getAll,getById,insert,remove,update}
  

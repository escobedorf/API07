const mongoose = require('../config/db');
const { Schema } = mongoose

//Estructura de la coleccion de usuario 

const usuarioSchema = new Schema({
    nombre:{
        type:String

    },
    apellido:{
        type:String

    },
    usuario:{
        type:String,
        unique:true

    },
    correo:{
        type:String,
        unique:true

    },
    clave:{
        type:String,

    },
})


//Coorrespondencia en la base de datos
const Usuario = mongoose.model('',usuarioSchema)
module.exports =Usuario;


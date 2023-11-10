const Usuario = require('../models/usuario.model')
const bcrypt = require('bcrypt')

exports.getAllUsers = async(req,res)=>{
    try{
        const listadoUsuarios = await Usuario.find();
        if(listadoUsuarios){
            res.status(200).json({
                estado  : 1,
                mensaje : "Usuario encontrado",
                usuario : listadoUsuarios
            });
        }else{
            res.status(404).json({
                estado  : 0,
                mensaje : "Usuario no encontrado",
            });
        }
        
    }catch(error){
        console.log(error);
        res.status(500).json({
            estado  : 0,
            mensaje : "Ocurrio un error desconocido"

        })
    }
}

exports.getUsersByEmail = async(req,res)=>{ 
    try{
        const {correo} = req.params;
        //console.log(email);
        const usuario = await Usuario.findOne({correo:correo}).exec();
        if(usuario){
            res.status(200).json({
                estado  : 1,
                mensaje : "Usuario encontrado",
                usuario : usuario
            })
        }else{
            res.status(404).json({
                estado  : 0,
                mensaje : "Usuario no encontrado"

            })

        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            estado  : 0,
            mensaje : "Ocurrio un error desconocido"
        })
    }
}



exports.addUser = async(req,res)=>{ 
    try{
        const{nombre, apellido, usuario, correo, clave}=req.body
        if(nombre == undefined || apellido  == undefined || usuario == undefined || correo == undefined || clave == undefined){
           res.status(400).json({
            estado:0,
            mensaje:"Faltan parametros"
           })
        }else{
            //falta verificar si el correo y/o usuario ya existe
            //Buscar si el usuario y/o usuario ya existe
            const usuarioEncontrado = await Usuario.findOne({$or:[{correo:correo},{usuario:usuario}]}).exec();

            if(usuarioEncontrado){
                res.status(200).json({
                    estado  : 0,
                    mensaje : "Usuario y/o email existente"
            })

            }else{
                //encriptar la clave
                const salt = await bcrypt.genSalt(8);
                claveEncriptada = await bcrypt.hash(clave, salt);

                const nuevoUsuario = await Usuario.create({nombre, apellido, usuario, correo, clave:claveEncriptada});
                if(nuevoUsuario){
                    res.status(200).json({
                        estado  : 1,
                        mensaje : "Usuario creado con exito",
                        usuario : nuevoUsuario
                    })
                }else{
                    res.status(500).json({
                        estado  : 1,
                        mensaje : "Ocurrio un error desconocido"
                })
                }

            }
        }

        }catch(error){
            res.status(500).json({
                estado  : 0,
                mensaje : "Ocurrio un error desconocido"
            })

        console.log(error);
    }
};

exports.updateUser = async(req,res)=> {
    try{
        const { correo } = req.params;
        const { nombre, apellido, clave } = req.body;
        if(nombre==undefined || apellido==undefined || clave==undefined)
        {
            res.status(400).json({
                estado: 0,
                mensaje: "Faltan patametros"
            })
        }else{
            //encriptar la clave
            const salt = await bcrypt.genSalt(8);
            claveEncriptada = await bcrypt.hash(clave, salt);

            await Usuario.findOneAndUpdate({correo: correo},{nombre: nombre, apellido: apellido, clave: claveEncriptada})
            res.status(200).json({
                estado: 1,
                mensaje: "El registro se actualizco correctamente",
            });
        }

    }catch(error){
        console.log(error);
        res.status(500).json({
            estado  : 0,
            mensaje : "Ocurrio un error desconocido"
        })

    }
}
exports.deleteUser = async(req,res)=> {
    try{
        const { correo } = req.params;
        const usuario = await Usuario.findOne({correo:correo}).exec();
        if(usuario){
            await Usuario.deleteOne(usuario)
            res.status(200).json({
                estado  : 1,
                mensaje : "Usuario eliminado"
            })
        }else{
            res.status(404).json({
            estado  : 0,
            mensaje : "Usuario no encontrado"
            })
        }

    }catch(error){
        console.log(error);
        res.status(500).json({
            estado  : 0,
            mensaje : "Ocurrio un error desconocido"
        })
    }
}

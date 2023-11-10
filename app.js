const express = require('express');
const routesUser = require('./src/routes/usuario.routes')
const app = express()
const puerto = process.env.PORT || 3000;

//Configuration del servidor
 app.use(express.json())
 app.use('/socios/v1/users', routesUser);

 //Ejecutar el servidor
app.listen(puerto,()=>{
    console.log('Servidor escuchando en el puerto', puerto);
});
//escobedorf
//148.204.142.9/32
const mongoose = require('mongoose');
const urilocal = " mongodb://127.0.0.1_27017/tienda";
const uriRemota = "mongodb+srv://escobedorf:Escobedo2001.@clusterfjer.360d6lx.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(uriRemota)

module.exports = mongoose;

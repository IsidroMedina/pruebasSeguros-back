const mongoose = require('mongoose');
const {Schema} = mongoose;

const seguroSchema = new Schema({
    titulo: String,
    nivel: String,
    descripcion: String,
});

const Seguro = mongoose.model('Seguro', seguroSchema);
module.exports = Seguro;
const mongoose = require('mongoose');
const {Schema} = mongoose;

const siniestroSchema = new Schema({
    titulo: String,
    fecha: String,
    descripcion: String,
    idPersona: {type: Schema.ObjectId, ref: 'Persona'},
});

const Siniestro = mongoose.model('Siniestro', siniestroSchema);
module.exports = Siniestro;
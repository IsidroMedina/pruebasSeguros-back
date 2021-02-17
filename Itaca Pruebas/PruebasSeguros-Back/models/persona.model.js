const mongoose = require("mongoose");
const { Schema } = mongoose;

const personaSchema = new Schema({
  nombre: String,
  apellidos: String,
  sex: String,
  fechaNacimiento: String,
  indentificacion: String,
  licenciaConducir: String,
  telefono: Number,
  email: String,
  direccion: String,
  idSeguro: { type: Schema.ObjectId, ref: "Seguro" },
});

const Persona = mongoose.model("Persona", personaSchema);

module.exports = Persona;

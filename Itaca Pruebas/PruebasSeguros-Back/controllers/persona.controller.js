const Persona = require("../models/persona.model");
personaCTRL = {};

personaCTRL.listar = async (req, res) => {
  let personas = await Persona.find().populate("idSeguro");

  if (!personas) {
    res.status(400).json({
      ok: false,
      mensaje: "No hay personas",
    });
  } else {
    res.status(200).json({
      ok: true,
      personas,
    });
  }
};

personaCTRL.registrar = async (req, res) => {
  let data = req.body;

  let persona = new Persona({
    nombre: data.nombre,
    apellidos: data.apellidos,
    sex: data.sex,
    fechaNacimiento: data.fechaNacimiento,
    identificacion: data.identificacion,
    licenciaConducir: data.licenciaConducir,
    telefono: data.telefono,
    email: data.email,
    direccion: data.direccion,
    idSeguro: data.idSeguro,
  });

  await persona.save((err, result) => {
    if (err) {
      res.status(500).send("Error en el servidor");
    } else {
      if (result) {
        res.status(200).json({
          ok: true,
          mensaje: "Persona Registrada",
          result,
        });
      } else {
        res.status(403).send("La persona no se ha podido registrar");
      }
    }
  });
};

personaCTRL.actualizar = async (req, res) => {
  let id = req.params.id;
  let data = req.body;

  let personaUp = await Persona.findByIdAndUpdate({ _id: id }, { $set: data });

  if (!personaUp) {
    return res.status(404).json({
      ok: false,
      mensaje: "No ha persona",
    });
  }

  res.status(200).json({
    ok: true,
    mensaje: " Persona Actualizada correctamente",
    personaUp,
  });
};

personaCTRL.obtener = async (req, res) => {
  let id = req.params.id;

  if (!id) return res.status(401).send({ message: "Error en el Servidor" });

  const persona = await Persona.findOne({ _id: id }).populate("idSeguro");

  res.status(200).send({ persona: persona });
};

personaCTRL.eliminar = async (req, res) => {
  let id = req.params.id;

  let persona = await Persona.findOneAndRemove({ _id: id });

  if (!persona) {
    return res.status(404).json({
      ok: false,
      mensaje: "No hay persona",
    });
  }

  res.status(200).json({
    ok: true,
    mensaje: "Persona eliminado",
  });
};

module.exports = personaCTRL;

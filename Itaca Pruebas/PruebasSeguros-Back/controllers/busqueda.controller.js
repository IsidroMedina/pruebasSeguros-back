const { response } = require('express');

const Persona = require('../models/persona.model');
const Seguro = require('../models/seguro.model');
const Siniestro = require('../models/siniesto.model');

 BusquedaCTRL = {};

BusquedaCTRL.getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    const [ personas, seguros, siniestros ] = await Promise.all([
        Persona.find({ nombre: regex }),
        Seguro.find({ titulo: regex }),
        Siniestro.find({ titulo: regex }),
    ]);

    res.json({
        ok: true,
        personas,
        seguros,
        siniestros
    })
}

module.exports = BusquedaCTRL;
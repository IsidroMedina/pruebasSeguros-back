const Siniestro = require('../models/siniesto.model');
siniestroCTRL = {};

siniestroCTRL.listar = async (req, res) => {
    let siniestros = await Siniestro.find()
        .populate({
            path: 'idPersona',
            model: 'Persona',
            populate: {
                path:  'idSeguro', 
                model: 'Seguro'
            }
        });

    if(!siniestros) {
        res.status(400).json({
            ok: false,
            mensaje:'No hay siniestros'
        });
    }

    else {
        res.status(200).json({
            ok:true,
            siniestros
        });
    }
}

siniestroCTRL.registrar = async (req, res) => {
    let data = req.body;

    let siniestro = new Siniestro({
        titulo: data.titulo,
        fecha: data.nivel,
        descripcion: data.descripcion,
        idPersona: data.idPersona
    });

     await siniestro.save((err, result) => {
         if(err)
         {
             res.status(500).json({
                 ok: false,
                 mensaje: 'Error en el servidor'
             });
         }

         else
          {
            if(result)
            {
                res.status(200).json({
                    ok: true,
                    mensaje: 'Siniestro Registrado',
                    result
                });
            }

            else 
            {
                res.status(403).send('El siniestro no se ha podido registrar');
            }
          }
     });
}

siniestroCTRL.editar = async (req, res) => {
    let id = req.params.id;
    let data = req.body;

    let siniestroUp = await Siniestro.findByIdAndUpdate(
        {_id: id},
        {$set: data}
    );

    if(!siniestroUp) {
        return res.status(404).json({
            ok:false,
            mensaje: 'No ha siniestro'
        })
    }

    res.status(200).json({
        ok: true,
        mensaje: ' Siniestro Actualizada correctamente',
        siniestroUp
    });
}

siniestroCTRL.obtener = async (req, res) => {
    let id = req.params.id;

    if(!id) return res.status(401).send({message: 'Error en el Servidor'});

    const siniestro = await Siniestro.findOne(
        {_id: id}
    ).populate({
        path: 'idPersona',
        model: 'Persona',
        populate: {
            path:  'idSeguro', 
            model: 'Seguro'
        }
    });

    res.status(200).send({siniestro: siniestro});
}

siniestroCTRL.eliminar = async (req, res) => {
    let id = req.params.id;

    let siniestro = await Siniestro.findOneAndRemove(
        {_id: id}
    );

    if(!siniestro) {
        return res.status(404).json({
            ok: false,
            mensaje: 'No hay siniestro'
        });
    }

    res.status(200).json({
        ok: true,
        mensaje: 'Siniestro eliminado'
    });
}

module.exports = siniestroCTRL;
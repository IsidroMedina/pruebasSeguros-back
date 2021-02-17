const Seguro = require('../models/seguro.model');
seguroCTRL = {}

seguroCTRL.registrar = async (req, res) => {

    let data = req.body;

    let seguro = new Seguro({
        titulo: data.titulo,
        nivel: data.nivel,
        descripcion: data.descripcion
    });

     await seguro.save((err, result) => {
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
                    mensaje: 'Seguro Registrado',
                    result
                });
            }

            else 
            {
                res.status(403).send('El seguro no se ha podido registrar');
            }
          }
     });

    
}

seguroCTRL.listar = async (req, res) => {
    let seguros = await Seguro.find();

    if(!seguros) {
        res.status(400).json({
            ok: false,
            mensaje:'No hay seguros'
        });
    }

    else {
        res.status(200).json({
            ok:true,
            seguros
        });
    }
}

seguroCTRL.obtener = async (req, res) => {
    let id = req.params.id;

    if(!id) return res.status(401).send({message: 'Error en el Servidor'});

    const seguro = await Seguro.findOne(
        {_id: id}
    );

    res.status(200).send({seguro: seguro});
}

seguroCTRL.editar = async (req, res) => {
    let id = req.params.id;
    let data = req.body;

    let seguroUp = await Seguro.findByIdAndUpdate({_id: id}, {
        $set: data
    });

    if(!seguroUp) {
        return res.status(404).json({
            ok: false,
            mensaje: 'No hay seguro'
        });
    };

    res.status(200).json({
        ok: true,
        mensaje: 'seguro actualizada',
        seguroUp
    });
}

seguroCTRL.eliminar = async (req, res) => {
    let id = req.params.id;

    let seguro = await Seguro.findOneAndDelete({
        _id: id
    });

    if(!seguro) {
        return res.status(404).json({
            ok: false,
            mensaje: 'No hay seguro'
        });
    };

    res.status(200).json({
        ok: true,
        mensaje: 'seguro eliminada'
    });
}

module.exports = seguroCTRL;
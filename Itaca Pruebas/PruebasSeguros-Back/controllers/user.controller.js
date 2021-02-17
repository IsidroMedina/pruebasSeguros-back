const User = require('../models/user,model');
const userCTRL = {};

userCTRL.registrar = async (req, res) => {
    let user = await User.findOne({email: req.body.email});

    if(user) 
    {
        return res.status(400).json({
            ok:false,
            mensaje: 'Este usuario ya existe'
        });
    }

    user = new User({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        email: req.body.email,
        password: req.body.password,
        role:  req.body.role
    });

    user.password = await user.encryptPassword(user.password);
     await user.save();
    const token = user.generateKJWT();

    res.status(200).json({
        ok: true,
        mensaje: 'Usuario registrado',
        user,
        token
    });
}

userCTRL.login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email}); // Comprobamos si el email existe
    const validPassword = await user.validatePassword(password); //Comprobamos que la password coincide

    //Si NO se encuentra el usuario
    if(!user) return res.status(400).json({
        ok:false,
        mensaje: 'Usuario No encontrado'
    });
    
    //Si la password NO coincide
    if(!validPassword) return res.status(400).json({
        ok:false,
        mensaje:'Password Incorrecta'
    });


    const token = user.generateKJWT();
    // Si todo esta bien lo devolvemos
    res.status(200).json({
        ok:true,
        user,
        token
    });

}

userCTRL.obtener = async (req, res) => {
    let id = req.params.id;

    if(!id) return res.status(401).send({message: 'Error en el Servidor'});

    const user = await User.findOne(
        {_id: id}
    );

    res.status(200).send({user});
}


module.exports = userCTRL
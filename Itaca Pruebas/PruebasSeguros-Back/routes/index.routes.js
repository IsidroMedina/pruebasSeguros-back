const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

const user = require('../controllers/user.controller');
const seguro = require('../controllers/seguro.controller');
const persona = require('../controllers/persona.controller');
const siniestro = require('../controllers/siniestros.controller');
const busqueda = require('../controllers/busqueda.controller');

//Rutas Usuarios
router.post('/registrar', user.registrar);
router.post('/login', user.login);

//Rutas Seguros
router.post('/seguros/registrar', verifyToken.auth, seguro.registrar);
router.get('/seguros', verifyToken.auth, seguro.listar),
router.get('/seguros/:id', verifyToken.auth, seguro.obtener),
router.patch('/seguros/editar/:id', verifyToken.auth, seguro.editar),
router.delete('/seguros/eliminar/:id', verifyToken.auth, seguro.eliminar),

//Rutas Personas
router.post('/personas/registrar', verifyToken.auth, persona.registrar);
router.get('/personas', verifyToken.auth, persona.listar);
router.get('/personas/:id', verifyToken.auth, persona.obtener);
router.patch('/personas/editar/:id', verifyToken.auth, persona.actualizar);
router.delete('/personas/eliminar/:id', verifyToken.auth, persona.eliminar);

//Rutas Siniestros
router.post('/siniestros/registrar', verifyToken.auth, siniestro.registrar);
router.get('/siniestros', verifyToken.auth, siniestro.listar);
router.get('/siniestros/:id', verifyToken.auth, siniestro.obtener);
router.patch('/siniestros/editar/:id', verifyToken.auth, siniestro.editar);
router.delete('/siniestros/eliminar/:id', verifyToken.auth, siniestro.eliminar);

//Rutas Busquedas
router.post('/todo/:busqueda', verifyToken.auth, busqueda.getTodo)


module.exports = router;
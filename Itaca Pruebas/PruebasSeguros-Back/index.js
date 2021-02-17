const express = require('express');
const cors = require('cors');
const app = express();

//CORS
app.use(cors());

//Database
require('./database');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Settings
app.set('port', process.env.PORT || 3000);

//Importar y usar Ruras
const routes = require('./routes/index.routes');
app.use('/api', routes);

//Lanzar Servidor
async function Init() {
    await app.listen(app.get('port'));
    console.log('Servidor en puerto', app.get('port'))
}

Init();
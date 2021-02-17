const mongoose = require('mongoose');
const URI = 'mongodb://localhost/itaca';


mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(db => console.log('Base de datos conectada'))
    .catch(err => console.log(err));
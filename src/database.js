const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0/proyecto', {

    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Base de datos conectada'))
    .catch(err => console.log(err));


const { Schema, model } = require('mongoose');

const zonaSchema = new Schema({
    codZona: Number,
    ciudad: String
}, {
    timestamps: true
});

module.exports = model('Zona', zonaSchema, 'Zonas');
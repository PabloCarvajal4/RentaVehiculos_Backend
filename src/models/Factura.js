const { Schema, model } = require('mongoose');

const facturaSchema = new Schema({
    dniCliente: String,
    nombre: String,
    placa: String,
    marca: String,
    modelo: String,
    fechaInicio: String,
    fechaFinal: String,
    total: Number
}, {
    timestamps: true
});

module.exports = model('Factura', facturaSchema, 'factura');
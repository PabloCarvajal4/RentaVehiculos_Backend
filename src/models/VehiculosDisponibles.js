const { Schema, model } = require('mongoose');

const vehiculoSchema = new Schema({
    placa: String,
    marca: String,
    modelo: String,
    anio: Number,
    transmision: String,
    color: String,
    tipo: String,
    zona: String
}, {
    timestamps: true
});

module.exports = model('Vehiculo', vehiculoSchema, 'VehiculosDisponibles');
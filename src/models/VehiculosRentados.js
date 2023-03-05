const { Schema, model } = require('mongoose');

const vehiculoRentadoSchema = new Schema({
    placa: String,
    marca: String,
    modelo: String,
    anio: Number,
    transmision: String,
    color: String,
    tipo: String,
    zona: String,
    tiempoRenta: Number,
    fechaInicio: String,
    fechaFinal: String
}, {
    timestamps: true
});

module.exports = model('Rentado', vehiculoRentadoSchema, 'VehiculosRentados');
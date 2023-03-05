const VehiculosRentados = require("../models/VehiculosRentados");

exports.obtenerVehiculos = async (req, res) => {

    try {

        const Vehiculos = await VehiculosRentados.find();
        res.json(Vehiculos)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerRentado = async (req, res) => {

    try {
        let vehiculo = await VehiculosRentados.findById(req.params.id);

        if(!vehiculo) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
       
        res.json(vehiculo);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.crear = async (req, res) => {

    try {
        let rentado;

        // Creamos nuestro producto
        rentado = new VehiculosRentados(req.body);

        await rentado.save();
        res.send(rentado);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarVehiculo = async (req, res) => {

    try {
        let vehiculo = await VehiculosRentados.findById(req.params.id);

        if(!vehiculo) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
       
        await VehiculosRentados.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Producto eliminado con exito' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
const VehiculosDisponibles = require("../models/VehiculosDisponibles");

exports.obtenerVehiculos = async (req, res) => {

    try {

        const Vehiculos = await VehiculosDisponibles.find();
        res.json(Vehiculos)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerVehiculo = async (req, res) => {

    try {
        let producto = await VehiculosDisponibles.findById(req.params.id);

        if(!producto) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
       
        res.json(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarVehiculo = async (req, res) => {

    try {
        let vehiculo = await VehiculosDisponibles.findById(req.params.id);

        if(!vehiculo) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
       
        await VehiculosDisponibles.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Producto eliminado con exito' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarVehiculo = async (req, res) => {

    try {
        const { placa, marca, modelo, anio, transmision, color, tipo, zona } = req.body;
        let producto = await VehiculosDisponibles.findById(req.params.id);

        if(!producto) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        producto.placa = placa;
        producto.marca = marca;
        producto.modelo = modelo;
        producto.anio = anio;
        producto.transmision = transmision;
        producto.color = color;
        producto.tipo = tipo;
        producto.zona = zona;

        producto = await VehiculosDisponibles.findOneAndUpdate({ _id: req.params.id },producto, { new: true} )
        res.json(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    } 
}

exports.crearVehiculo = async (req, res) => {

    try {
        let producto;

        // Creamos nuestro producto
        producto = new VehiculosDisponibles(req.body);

        await producto.save();
        res.send(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
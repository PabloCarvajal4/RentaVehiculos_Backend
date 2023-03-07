const Factura = require("../models/Factura");

exports.obtenerFacturas = async (req, res) => {

    try {

        const fact = await Factura.find();
        res.json(fact)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
 
exports.crearFactura = async (req, res) => {

    try {
        let fact;

        // Creamos nuestro producto
        fact = new Factura(req.body);

        await fact.save();
        res.send(fact);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarFactura = async (req, res) => {

    try {
        let factura = await Factura.findById(req.params.id);

        if(!factura) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
       
        await Factura.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Producto eliminado con exito' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerFactura = async (req, res) => {

    try {
        let vehiculo = await Factura.findById(req.params.id);

        if(!vehiculo) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
       
        res.json(vehiculo);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
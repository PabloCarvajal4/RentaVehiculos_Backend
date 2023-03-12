const Zona = require("../models/Zonas");

exports.obtenerZonas = async (req, res) => {

    try {

        const fact = await Zona.find();
        res.json(fact)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.crearZona = async (req, res) => {

    try {
        let fact;

        // Creamos nuestro producto
        fact = new Zona(req.body);

        await fact.save();
        res.send(fact);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
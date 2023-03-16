const express = require('express');
const vehiculosController = require('../controllers/vehiculosController');
const rentadosController = require('../controllers/RentadosController');
const FacturaController = require('../controllers/FacturaController');
const ZonasController = require('../controllers/ZonasController');

const { Router } = require('express');
const router = Router();

const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hello world'))

router.post('/signup', async (req,res)=> {
    const { email, password } = req.body;
    const newUser = new User({email, password});
    await newUser.save();
    
    const token = await jwt.sign({_id: newUser._id}, 'secretkey');
    res.status(200).json({token});
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(401).send('El correo no\' existe');
    if (user.password !== password) return res.status(401).send('Contraseña Incorrecta');

		const token = jwt.sign({_id: user._id}, 'secretkey');

    return res.status(200).json({token});
});
/*------------------------VEHICULOS DISPONIBLES-------------------- */
router.get('/progreso', vehiculosController.obtenerVehiculos);
router.delete('/progreso/:id', vehiculosController.eliminarVehiculo);
router.get('/progreso/:id', vehiculosController.obtenerVehiculo);
router.put('/progreso/:id', vehiculosController.actualizarVehiculo);
router.post('/progreso', vehiculosController.crearVehiculo);

/*------------------------VEHICULOS RENTADOS-------------------- */
router.get('/rentados', rentadosController.obtenerVehiculos);
router.post('/rentados', rentadosController.crear);
router.get('/rentados/:id', rentadosController.obtenerRentado);
router.delete('/rentados/:id', rentadosController.eliminarVehiculo);

/*------------------------VEHICULOS RENTADOS-------------------- */
router.get('/facturas', FacturaController.obtenerFacturas);
router.post('/crear-factura', FacturaController.crearFactura);
router.delete('/facturas/:id', FacturaController.eliminarFactura);
router.get('/crear-factura/:id', FacturaController.obtenerFactura);

/*------------------------VEHICULOS RENTADOS-------------------- */
router.get('/zonas', ZonasController.obtenerZonas);
router.post('/zonas', ZonasController.crearZona);

async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = await jwt.verify(token, 'secretkey');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}

module.exports = router;
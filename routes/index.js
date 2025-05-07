import express from 'express';
import { renderIndex } from '../controllers/indexcontroller.js';
import { renderRegister } from '../controllers/registercontroller.js';
import { obtenerEstados } from '../controllers/ObtenerEstados.js';
import { storeUser } from '../controllers/añadirusercontroller.js';

const router = express.Router();

// Ruta para la página de inicio
router.get('/', renderIndex);

// Ruta para la página de registro
router.get('/register', obtenerEstados, renderRegister);

// Ruta para procesar el formulario de registro
router.post('/register', storeUser);

export default router;

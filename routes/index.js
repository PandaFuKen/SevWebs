import express from 'express';
import { renderIndex } from '../controllers/indexcontroller.js';
import { renderRegister } from '../controllers/registercontroller.js';
import obtenerEstados = from ('../controllers/ObtenerEstados.js'); // Importar el controlador

const router = express.Router();

// Ruta para la página de inicio
router.get('/', renderIndex);

// Ruta para la página de registro
router.get('/register', renderRegister, ObtenerEstados);

export default router;

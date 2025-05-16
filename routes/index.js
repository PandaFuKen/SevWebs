import express from 'express';
import { renderIndex } from '../controllers/indexcontroller.js';
import { renderRegister } from '../controllers/registercontroller.js';
import { obtenerEstados } from '../controllers/ObtenerEstados.js';
import { storeUser } from '../controllers/añadirusercontroller.js';
import { loginuser } from '../controllers/loginuser.js';
import { loginUser } from '../controllers/logincontroller.js';
import { isAuthenticated } from '../middlewares/authMiddlewares.js';

const router = express.Router();

// Ruta para la página de inicio
router.get('/', renderIndex);

// Ruta para la página de registro
router.get('/register', obtenerEstados, renderRegister);

// Ruta para procesar el formulario de registro
router.post('/register', storeUser);

// Ruta para mostrar el formulario de inicio de sesión
router.get('/login', loginuser);

// Ruta para procesar el inicio de sesión
router.post('/login', loginUser);

//DashBorad Admin
router.get('/adminDash', isAuthenticated, (req, res) => {
  if (req.session.user.rol !== 1) {
    return res.status(403).send('Acceso denegado'); // Verifica que sea Administrador
  }
  res.render('adminDash', { user: req.session.user });
});
//DashBoard user
router.get('/userDash', isAuthenticated, (req, res) => {
  if (req.session.user.rol !== 2) {
    return res.status(403).send('Acceso denegado'); // Verifica que sea Usuario
  }
  res.render('userDash', { user: req.session.user });
});


// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      return res.status(500).send('Error al cerrar sesión');
    }
    res.redirect('/login');
  });
});

export default router;

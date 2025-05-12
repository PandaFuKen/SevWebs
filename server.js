import express from 'express';
import dotenv from 'dotenv';
import bycrpt from 'bcrypt';
import indexRoutes from './routes/index.js';
import session from 'express-session';

dotenv.config();
const app = express();

// Middleware para procesar datos del formulario
app.use(express.urlencoded({ extended: true }));

// Middleware para sesiones
app.use(session({
  secret: 'Panda020406', // Cambia esto por una clave secreta más segura
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Cambia a `true` si usas HTTPS
}));

// EJS como motor de plantillas
app.set('view engine', 'ejs');

// Carpeta de archivos públicos
app.use(express.static('public'));

// Rutas
app.use('/', indexRoutes);

// Middleware para manejar errores 404
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Página no encontrada' });
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});

const express = require('express');
const app = express();
const path = require('path');

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views')); // Cambiar ruta de views

// Middleware para archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal para renderizar index.ejs
app.get('/', (req, res) => {
    res.render('index', { titulo: 'Mi Página con Node.js y EJS' });
});
//Ruta para renderizar la pagina de login
app.get('/login', (req, res) => {
    res.render('login/index', { titulo: 'Página de Login' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

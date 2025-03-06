const express = require('express');
const router = express.Router();

// Página principal
router.get('/', (req, res) => {
    res.render('index', { titulo: 'Mi Página con Node.js y EJS' });
});

// Página de login
router.get('/login', (req, res) => {
    res.render('login', { titulo: 'Iniciar Sesión' });
});
//Pagina hola
router.get('/hola', (req, res) => {
    res.render('hola', { titulo: 'Hello Word!' });
});

// Otras páginas que vayas agregando
router.get('/register', (req, res) => {
    res.render('register', { titulo: 'Registro' });
});

module.exports = router;

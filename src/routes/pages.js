const express = require('express');
const router = express.Router();

// Página principal
router.get('/', (req, res) => {
    res.render('index',);
});

//Pagina hola
router.get('/hola', (req, res) => {
    res.render('hola', { titulo: 'Hello Word!' });
});

// Pagina de registro
router.get('/register', (req, res) => {
    res.render('register', { titulo: 'Registro' });
});

//Direecion de usuarios
router.get('/users', (req, res) => {
    res.render('users',);
});


module.exports = router;

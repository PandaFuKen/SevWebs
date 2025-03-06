const express = require('express');
const app = express();
const path = require('path');
const pagesRouter = require('./src/routes/pages'); // Importa las rutas

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Middleware para archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Usar el router para manejar las páginas
app.use('/', pagesRouter);

// Middleware para manejar errores 404
app.use((req, res, next) => {
    res.status(404).render('404', { titulo: 'Página no encontrada' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const express = require('express');
const router = express.Router();
const db = require('../config/db.js'); // Asegúrate de que la conexión a la base de datos esté configurada correctamente

router.get('/register', async (req, res) => {
    try {
        // Consulta para obtener los estados desde la base de datos
        const { rows: estados } = await db.query(`
            SELECT codigo_estado, nombre_estado
            FROM estados_mexicanos
        `);
        
        // Renderizar la vista de registro con los estados
        res.render('register', { titulo: 'Registro', estados });
    } catch (error) {
        console.error('Error al obtener los estados:', error);
        res.status(500).send('Error al cargar los estados');
    }
});

module.exports = router;
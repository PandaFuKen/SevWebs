import express from 'express';
import { pool } from '../config/db.js';
export const obtenerEstados = async (req, res, next) => {
  try {
    // Realiza la consulta a la base de datos
    const result = await pool.query('SELECT codigo_estado, nombre_estado FROM estados_mexicanos');
    const estados = result.rows;

    // Almacena los estados en `res.locals` para que estén disponibles en la vista
    res.locals.estados = estados;

    // Llama al siguiente middleware o controlador
    next();
  } catch (error) {
    console.error('Error al obtener los estados:', error);
    res.status(500).send('Error al obtener los estados');
  }
};


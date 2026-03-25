import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

export const storeUser = async (req, res) => {
  const {
    nombres,
    apellidoPaterno,
    apellidoMaterno,
    fechaNacimiento,
    estado,
    sexo,
    telefono,
    correo,
    contraseña,
  } = req.body;

  try {
    // Encripta la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Consulta para insertar el usuario en la base de datos y devolver el id
    const query = `
      INSERT INTO usuarios (
        nombre, apellido_paterno, apellido_materno, fecha_nacimiento, codigo_estado, sexo, telefono, correo, contrasena
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id_usuario
    `;

    const values = [
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      fechaNacimiento,
      estado,
      sexo,
      telefono,
      correo,
      hashedPassword, // Usa la contraseña encriptada
    ];

    // Ejecuta la consulta y obtiene el id del nuevo usuario
    const result = await pool.query(query, values);
    const newUserId = result.rows[0].id_usuario; // <-- Corrección aquí

    // Crea la carpeta con el ID del usuario
    const userFolder = path.join('Documentos', String(newUserId));
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true });
    }

    // Redirige al usuario a una página de éxito o de inicio
    res.redirect('/login');
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).send('Error al registrar el usuario');
  }
};
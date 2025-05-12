import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';

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

    // Consulta para insertar el usuario en la base de datos
    const query = `
      INSERT INTO usuarios (
        nombre, apellido_paterno, apellido_materno, fecha_nacimiento, codigo_estado, sexo, telefono, correo, contrasena
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
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

    await pool.query(query, values);

    // Redirige al usuario a una página de éxito o de inicio
    res.redirect('/');
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).send('Error al registrar el usuario');
  }
};
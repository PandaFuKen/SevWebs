import { pool } from '../config/db.js';

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
    contrasena,
  } = req.body;

  try {
    // Consulta para insertar el usuario en la base de datos
    const query = `
      INSERT INTO personas (
        nombres, apellido_paterno, apellido_materno, fecha_nacimiento, estado, sexo, telefono, correo, contrasena
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
      contrasena,
    ];

    await pool.query(query, values);

    // Redirige al usuario a una página de éxito o de inicio
    res.redirect('/');
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).send('Error al registrar el usuario');
  }
};
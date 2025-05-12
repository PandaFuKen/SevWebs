import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';

export const loginUser = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    // Consulta para verificar si el usuario existe
    const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);

    if (result.rows.length === 0) {
      return res.status(401).send('Usuario no encontrado');
    }

    const user = result.rows[0];

    // Verifica la contraseña
    const isMatch = await bcrypt.compare(contraseña, user.contrasena);
    if (!isMatch) {
      return res.status(401).send('Contraseña incorrecta');
    }

    // Guarda los datos del usuario en la sesión
    req.session.user = {
      id: user.id,
      nombre: user.nombre,
      rol: user.id_rol
    };

    res.redirect('/dashboard'); // Redirige al panel del usuario
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).send('Error al iniciar sesión');
  }
};


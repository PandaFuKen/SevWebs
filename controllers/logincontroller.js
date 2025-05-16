import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';
export const loginUser = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo.trim()]);

    if (result.rows.length === 0) {
      return res.render('login', { error: 'Usuario no encontrado' });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(contraseña, user.contrasena);
    if (!isMatch) {
      return res.render('login', { error: 'Contraseña incorrecta' });
    }

    req.session.user = {
      id: user.id,
      nombre: user.nombre,
      rol: user.id_rol,
    };

    if (user.id_rol === 1) {
      res.redirect('/adminDash');
    } else {
      res.redirect('/userDash');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.render('login', { error: 'Error interno del servidor. Por favor, intenta más tarde.' });
  }
};
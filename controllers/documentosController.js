import { pool } from '../config/db.js';

export const verPersonales = async (req, res) => {
  const userId = req.session.user.id_usuario;
  const result = await pool.query(
    "SELECT * FROM documentos WHERE id_usuario = $1 AND categoria = 'PERSONAL'",
    [userId]
  );
  res.render('personales', { documentos: result.rows });
};

export const verCertificados = async (req, res) => {
  const userId = req.session.user.id_usuario;
  const result = await pool.query(
    "SELECT * FROM documentos WHERE id_usuario = $1 AND categoria = 'CERTIFICADO'",
    [userId]
  );
  res.render('certificados', { documentos: result.rows });
};

export const verCursos = async (req, res) => {
  const userId = req.session.user.id_usuario;
  const result = await pool.query(
    "SELECT * FROM documentos WHERE id_usuario = $1 AND categoria = 'CURSO'",
    [userId]
  );
  res.render('cursos', { documentos: result.rows });
};
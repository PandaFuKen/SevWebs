import { pool } from '../config/db.js';
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Guarda archivos temporalmente
const upload = multer({ dest: 'uploads/tmp' });

router.post('/documento', upload.single('documento'), async (req, res) => {
  const { nombre, descripcion, fecha, categoria } = req.body;
  const userId = req.session.user ? req.session.user.id_usuario : null;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
  }

  const idDocumento = await guardarDocumentoEnBD({
    nombre, descripcion, fecha, categoria, userId
  });

  if (req.file) {
    const ext = path.extname(req.file.originalname);
    const userDir = path.join(process.cwd(), 'Documentos', String(userId));
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    const newFileName = `${idDocumento}${ext}`;
    const newPath = path.join(userDir, newFileName);
    fs.renameSync(req.file.path, newPath);

    const direccion = path.join('Documentos', String(userId), newFileName);
    await actualizarRutaDocumento(idDocumento, direccion);
  }

  res.json({ success: true, message: 'Documento guardado correctamente' });
});

// Guarda el documento y devuelve el id_documento
async function guardarDocumentoEnBD(data) {
  const query = `
    INSERT INTO documentos (id_usuario, nombre, descripcion, fecha, direccion, categoria)
    VALUES ($1, $2, $3, $4, '', $5)
    RETURNING id_documento
  `;
  const values = [
    data.userId,
    data.nombre,
    data.descripcion,
    data.fecha,
    data.categoria
  ];
  const result = await pool.query(query, values);
  return result.rows[0].id_documento;
}

// Actualiza la ruta del archivo en la base de datos
async function actualizarRutaDocumento(idDocumento, direccion) {
  const query = `
    UPDATE documentos SET direccion = $1 WHERE id_documento = $2
  `;
  await pool.query(query, [direccion, idDocumento]);
}

router.get('/documento/ver/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT direccion FROM documentos WHERE id_documento = $1', [id]);
  if (result.rows.length === 0) return res.status(404).send('Documento no encontrado');
  const filePath = path.join(process.cwd(), result.rows[0].direccion);
  if (!fs.existsSync(filePath)) return res.status(404).send('Archivo no encontrado');
  res.sendFile(filePath);
});

// Descargar documento
router.get('/documento/descargar/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT direccion, nombre FROM documentos WHERE id_documento = $1', [id]);
  if (result.rows.length === 0) return res.status(404).send('Documento no encontrado');
  const filePath = path.join(process.cwd(), result.rows[0].direccion);
  if (!fs.existsSync(filePath)) return res.status(404).send('Archivo no encontrado');
  res.download(filePath, result.rows[0].nombre + path.extname(filePath));
});

export default router;
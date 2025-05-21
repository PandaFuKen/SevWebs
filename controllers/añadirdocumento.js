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
  const userId = req.session.user ? req.session.user.id_usuario : null; // <-- Cambiado aquí

  if (!userId) {
    return res.status(401).send('Usuario no autenticado');
  }

  // 1. Guarda el registro en la base de datos con dirección vacía y obtén el id
  const idDocumento = await guardarDocumentoEnBD({
    nombre, descripcion, fecha, categoria, userId
  });

  // 2. Renombra y mueve el archivo a la carpeta del usuario
  if (req.file) {
    const ext = path.extname(req.file.originalname);
    const userDir = path.join(process.cwd(), 'Documentos', String(userId));
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    const newFileName = `${idDocumento}${ext}`;
    const newPath = path.join(userDir, newFileName);
    fs.renameSync(req.file.path, newPath);

    // 3. Actualiza la ruta del archivo en la base de datos
    const direccion = path.join('Documentos', String(userId), newFileName);
    await actualizarRutaDocumento(idDocumento, direccion);
  }

  res.send('Documento guardado correctamente');
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

export default router;
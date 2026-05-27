import { v4 as uuidv4 } from "uuid";
import pool from "../db/connection.js";
import QRCode from "qrcode";

export const crearSesion = async (req, res) => {
  try {
    const { materia, profesor, fecha_asesoria, hora_asesoria } = req.body;

    // 🔍 Buscar correo automáticamente
    const [rows] = await pool.query(
    "SELECT correo FROM maestros WHERE CONCAT(nombre, ' ', apellidos) = ? LIMIT 1",
    [profesor]
    );

    if (rows.length === 0) {
    return res.status(404).json({ error: "Profesor no encontrado" });
    }

    const correo_profesor = rows[0].correo;

    if (!materia || !profesor || !correo_profesor) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const session_id = uuidv4();

    const now = new Date();
    const expires = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 horas

    await pool.query(
      `INSERT INTO sesiones 
      (session_id, materia, profesor, correo_profesor, fecha_asesoria, hora_asesoria, created_at, expires_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        session_id,
        materia,
        profesor,
        correo_profesor,
        fecha_asesoria,
        hora_asesoria,
        now,
        expires
      ]
    );

    const BASE_URL = process.env.BASE_URL;

    const url = `${BASE_URL}/registro.html?sid=${session_id}`;

    const qr = await QRCode.toDataURL(url);

    res.json({
        ok: true,
        session_id,
        url,
        qr
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
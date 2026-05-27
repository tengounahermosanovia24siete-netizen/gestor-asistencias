import pool from "../db/connection.js";
import { enviarCorreo } from "../services/mail.service.js";

export const registrarAsistencia = async (req, res) => {
  try {
    const {
      session_id,
      nombre,
      apellidos,
      boleta
    } = req.body;

    if (!session_id || !nombre || !apellidos || !boleta) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    // 🔍 1. Buscar sesión
    const [sesionRows] = await pool.query(
      "SELECT * FROM sesiones WHERE session_id = ?",
      [session_id]
    );

    if (sesionRows.length === 0) {
      return res.status(404).json({ error: "Sesión no encontrada" });
    }

    const sesion = sesionRows[0];

    // ⏰ 2. Validar expiración
    if (new Date() > new Date(sesion.expires_at)) {
      return res.status(400).json({ error: "Sesión expirada" });
    }

    // 🔐 3. dedupe
    const dedupe_key = `${session_id}-${boleta}`;

    // 🧠 4. Evitar duplicados
    const [dup] = await pool.query(
      "SELECT id FROM asistencias WHERE dedupe_key = ?",
      [dedupe_key]
    );

    if (dup.length > 0) {
      return res.status(400).json({ error: "Ya registraste asistencia" });
    }

    // 💾 5. Guardar asistencia
    await pool.query(
      `INSERT INTO asistencias 
      (timestamp_registro, materia, profesor, nombre, apellidos, boleta, fecha_asesoria, hora_asesoria, session_id, dedupe_key, user_agent)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        new Date(),
        sesion.materia,
        sesion.profesor,
        nombre,
        apellidos,
        boleta,
        sesion.fecha_asesoria,
        sesion.hora_asesoria,
        session_id,
        dedupe_key,
        req.headers["user-agent"] || ""
      ]
    );

    await enviarCorreo({
        to: sesion.correo_profesor,
        subject: "Nueva asistencia registrada",
        text: `El alumno ${nombre} ${apellidos} con boleta ${boleta} asistió a ${sesion.materia}`
        });

    // 📧 (aquí irá el correo después)

    res.json({
      ok: true,
      message: "Asistencia registrada"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
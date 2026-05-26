import pool from "../db/connection.js";

export const obtenerMaestros = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM maestros");

    res.json(rows);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const agregarMaestro = async (req, res) => {
  try {
    const { nombre, apellidos, materia, correo } = req.body;

    if (!nombre || !apellidos || !materia || !correo) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    await pool.query(
      "INSERT INTO maestros (nombre, apellidos, materia, correo) VALUES (?, ?, ?, ?)",
      [nombre, apellidos, materia, correo]
    );

    res.json({ ok: true, message: "Maestro agregado" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarMaestro = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM maestros WHERE id = ?", [id]);

    res.json({ ok: true, message: "Maestro eliminado" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarMaestro = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellidos, materia, correo } = req.body;

    if (!nombre || !apellidos || !materia || !correo) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    await pool.query(
      `UPDATE maestros 
       SET nombre = ?, apellidos = ?, materia = ?, correo = ?
       WHERE id = ?`,
      [nombre, apellidos, materia, correo, id]
    );

    res.json({ ok: true, message: "Maestro actualizado" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
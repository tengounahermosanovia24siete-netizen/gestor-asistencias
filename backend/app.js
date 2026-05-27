import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import cors from "cors";
import pool from "./db/connection.js";
import sesionesRoutes from "./routes/sesiones.routes.js";
import asistenciasRoutes from "./routes/asistencias.routes.js";
import maestrosRoutes from "./routes/maestros.routes.js";

const app = express(); // ✅ PRIMERO crear app

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend")));

// ✅ DESPUÉS usar rutas
app.use("/sesiones", sesionesRoutes);
app.use("/asistencias", asistenciasRoutes);
app.use("/maestros", maestrosRoutes);

// 🔥 PRUEBA DB
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 as test");
    res.json({ ok: true, result: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor en http://localhost:${process.env.PORT}`);
});
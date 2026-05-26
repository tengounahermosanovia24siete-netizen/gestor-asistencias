import express from "express";
import { registrarAsistencia } from "../controllers/asistencias.controller.js";

const router = express.Router();

router.post("/", registrarAsistencia);

export default router;
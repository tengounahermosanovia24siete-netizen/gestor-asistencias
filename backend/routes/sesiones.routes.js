import express from "express";
import { crearSesion } from "../controllers/sesiones.controller.js";

const router = express.Router();

router.post("/", crearSesion);

export default router;
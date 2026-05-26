import express from "express";
import { 
  obtenerMaestros, 
  agregarMaestro, 
  eliminarMaestro,
  actualizarMaestro
} from "../controllers/maestros.controller.js";

const router = express.Router();

router.get("/", obtenerMaestros);
router.post("/", agregarMaestro);
router.delete("/:id", eliminarMaestro);
router.put("/:id", actualizarMaestro);

export default router;
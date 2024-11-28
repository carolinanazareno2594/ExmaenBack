import { Router } from "express";
import {
  getAllArtefactos,
  getArtefactoById,
  getArtefactosByNombre,
  postArtefacto,
  putArtefacto,
  deleteArtefacto,
} from "../controllers/artefacto.controller.js"; // Ajusta la ruta según sea necesario

const artefacto = Router();

// Rutas para artefactos
artefacto.get("/", getAllArtefactos); // Obtener todos los artefactos

artefacto.get("/:id", getArtefactoById); // Obtener artefacto por ID

artefacto.get("/nombre/:nombre", getArtefactosByNombre); // Buscar artefactos por nombre parcial

artefacto.post("/", postArtefacto); // Crear un nuevo artefacto

artefacto.put("/:id", putArtefacto); // Actualizar un artefacto por ID

artefacto.delete("/:id", deleteArtefacto); // Eliminar un artefacto por ID

export default artefacto;

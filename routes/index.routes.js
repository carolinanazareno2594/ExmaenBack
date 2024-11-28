import artefacto from "./artefacto.routes.js";
import { Router } from "express";

const indexRoutes = Router();

indexRoutes.use("/artefactos", artefacto);

export default indexRoutes;

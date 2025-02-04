import { Router } from "express";
import {
  findAllPaises,
  findPaisById,
  findPaisByDominio,
  createNewPais,
  updateExistingPais,
  deleteExistingPais,
} from "../controllers/pais.controller.js";

const router = Router();

router.get("/paises", findAllPaises);
router.get("/paises/:id", findPaisById);
router.get("/paises/dominio/:dominio", findPaisByDominio);
router.post("/paises", createNewPais);
router.put("/paises/:id", updateExistingPais);
router.delete("/paises/:id", deleteExistingPais);

export default router;

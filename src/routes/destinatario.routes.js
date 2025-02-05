import { Router } from "express";
import {
    crearDestinatarioController,
    obtenerDestinatarioController
} from "../controllers/destinatario.controller.js";
import { checkSession } from "../middlewares/session.middleware.js";

const router = Router();

router.post("/destinatario", checkSession, crearDestinatarioController);
router.get("/destinatario/:currentUser", checkSession, obtenerDestinatarioController);

export default router;



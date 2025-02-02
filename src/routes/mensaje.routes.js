import { Router } from "express";
import {
  getAllMensajesController,
  createMensajeController,
  getMensajesByUsuarioController,
  sendMensajeController,
} from "../controllers/mensaje.controller.js";
import { checkSession } from "../middlewares/session.middleware.js";

const router = Router();

router.get("/mensajes", checkSession, getAllMensajesController);
router.post("/mensajes", checkSession, createMensajeController);
router.get("/mensajes/enviados", checkSession, getMensajesByUsuarioController);
router.post("/enviomensaje", checkSession, sendMensajeController);

export default router;

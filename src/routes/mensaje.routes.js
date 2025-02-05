import { Router } from "express";
import {
  getAllMensajesController,
  createMensajeController,
  getMensajesByUsuarioController,
  sendMensajeController,
  getMensajesByIdController,
  sendRespuestaMensajeController,
} from "../controllers/mensaje.controller.js";
import { checkSession } from "../middlewares/session.middleware.js";

const router = Router();

//Obtener todos los mensajes
router.get("/mensajes", checkSession, getAllMensajesController);
//Mensajes sin destinatario
router.post("/mensajes", checkSession, createMensajeController);
//Obtener los mensajes con usuario loggeado
router.get("/mensajes/enviados", checkSession, getMensajesByUsuarioController);
//Enviar mensaje asignando datos a contacto y destinatario
router.post("/enviomensaje", checkSession, sendMensajeController);
//Obtner mensaje por ID
router.get("/mensaje/id", getMensajesByIdController);
//Responder Mensaje de usuario
router.post("/mensajes/responder" ,checkSession, sendRespuestaMensajeController)

export default router;

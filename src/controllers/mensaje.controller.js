import { handleCreateMensaje } from "../services/mensaje.service.js";
import {
  getAllMensajes,
  getMensajesByUsuario,
} from "../repositories/mensaje.dao.js";
import { validationContact } from "../services/contacto.service.js";
import { agregarDestinatarios } from "../services/destinatario.service.js";

export const getAllMensajesController = async (req, res) => {
  try {
    const mensajes = await getAllMensajes();
    res.status(200).json(mensajes);
  } catch (error) {
    console.error("Error al consultar usuarios:", error);
    res.status(500).json({ message: "Error al consultar usuarios", error });
  }
};

export const getMensajesByUsuarioController = async (req, res) => {
  try {
    const currentUser = req.session.user;
    const mensajes = await getMensajesByUsuario(currentUser.id);
    res.status(200).json(mensajes);
  } catch (error) {
    console.error("Error al consultar mensajes:", error);
    res.status(500).json({ message: "Error al consultar mensajes", error });
  }
};

export const createMensajeController = async (req, res) => {
  try {
    const currentUser = req.session.user;
    const mensaje = await handleCreateMensaje(req, res, currentUser);
    res.status(201).json(mensaje);
  } catch (error) {
    console.error("Error al crear mensaje:", error);
    res.status(500).json({ message: "Error al crear mensaje", error });
  }
};

export const sendMensajeController = async (req, res) => {
  try {
    const currentUser = req.session.user;
    const { asunto, cuerpoMensaje, destinatarios, contacto } = req.body;

    console.log("Usuario actual:", currentUser);
    console.log("Asunto:", asunto);
    console.log("Cuerpo del mensaje:", cuerpoMensaje);
    console.log("Destinatarios:", destinatarios);

    if (
      !asunto ||
      !cuerpoMensaje ||
      !destinatarios ||
      destinatarios.length === 0
    ) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const mensaje = await handleCreateMensaje(req, res, currentUser);

    console.log({"mensaje completo":mensaje, "idMensaje":mensaje.idMensaje})

    const destinatariosAdded = await agregarDestinatarios(currentUser.id, mensaje.idMensaje, destinatarios);

    if (destinatariosAdded && mensaje) {
      res.status(201).json(true);
    }else{
      res.status(500).json( true );
    }
  } catch (error) {
    console.error("Error al crear mensaje:", error);
    res.status(500).json({ message: "Error al crear mensaje", error });
  }
};

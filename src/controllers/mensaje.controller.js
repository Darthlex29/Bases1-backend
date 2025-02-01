import { handleCreateMensaje } from "../services/mensaje.service.js";
import { getAllMensajes, getMensajesByUsuario } from "../repositories/mensaje.dao.js";

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
    const currentUser  = req.session.user;
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

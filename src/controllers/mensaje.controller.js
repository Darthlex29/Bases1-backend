// Importación de funciones desde los servicios y el módulo de acceso a datos (DAO).
import { handleCreateMensaje, responderMensaje } from "../services/mensaje.service.js"; // Función para crear mensajes.
import {
  getAllMensajes,
  getMensajeById,
  getMensajesByUsuario,
} from "../repositories/mensaje.dao.js"; // Funciones para obtener mensajes.
import { validationContact } from "../services/contacto.service.js"; // Función para validar contactos.
import { agregarDestinatarios } from "../services/destinatario.service.js"; // Función para agregar destinatarios.

// Controlador para obtener todos los mensajes.
export const getAllMensajesController = async (req, res) => {
  try {
    const mensajes = await getAllMensajes(); // Obtiene todos los mensajes.
    res.status(200).json(mensajes); // Responde con la lista de mensajes.
  } catch (error) {
    console.error("Error al consultar usuarios:", error); // Log del error.
    res.status(500).json({ message: "Error al consultar usuarios", error }); // Responde con un error 500.
  }
};

// Controlador para obtener mensajes por el ID del usuario actual.
export const getMensajesByUsuarioController = async (req, res) => {
  try {
    const currentUser = req.session.user; // Obtiene el usuario actual de la sesión.
    const mensajes = await getMensajesByUsuario(currentUser.id); // Obtiene los mensajes del usuario.
    res.status(200).json(mensajes); // Responde con los mensajes del usuario.
  } catch (error) {
    console.error("Error al consultar mensajes:", error); // Log del error.
    res.status(500).json({ message: "Error al consultar mensajes", error }); // Responde con un error 500.
  }
};

export const getMensajesByIdController = async (req, res) => {
  try {
    const mensajeSelected = req.body; // Obtiene el usuario actual de la sesión.
    console.log(mensajeSelected.idMensaje);
    const mensajes = await getMensajeById(mensajeSelected.idMensaje); // Obtiene los mensajes del usuario.
    res.status(200).json(mensajes); // Responde con los mensajes del usuario.
  } catch (error) {
    console.error("Error al consultar mensajes:", error); // Log del error.
    res.status(500).json({ message: "Error al consultar mensajes", error }); // Responde con un error 500.
  }
};

// Controlador para crear un mensaje.
export const createMensajeController = async (req, res) => {
  try {
    const currentUser = req.session.user; // Obtiene el usuario actual de la sesión.
    const mensaje = await handleCreateMensaje(req, res, currentUser); // Crea el mensaje.
    res.status(201).json(mensaje); // Responde con el mensaje creado.
  } catch (error) {
    console.error("Error al crear mensaje:", error); // Log del error.
    res
      .status(500)
      .json({ message: "Error al crear mensaje", error: error.message }); // Responde con un error 500.
  }
};

// Controlador para crear un mensaje.
export const createRespuestaMensajeController = async (req, res) => {
  try {
    const currentUser = req.session.user; // Obtiene el usuario actual de la sesión.
    const mensaje = await responderMensaje(req, res, currentUser); // Crea el mensaje.
    res.status(201).json(mensaje); // Responde con el mensaje creado.
  } catch (error) {
    console.error("Error al crear mensaje:", error); // Log del error.
    res
      .status(500)
      .json({ message: "Error al crear mensaje", error: error.message }); // Responde con un error 500.
  }
};

// Controlador para enviar un mensaje.
export const sendMensajeController = async (req, res) => {
  try {
    const currentUser = req.session.user; // Obtiene el usuario actual de la sesión.
    const { asunto, cuerpoMensaje, destinatarios, contacto } = req.body; // Extrae los datos del cuerpo de la solicitud.

    console.log("Usuario actual:", currentUser); // Log del usuario actual.
    console.log("Asunto:", asunto); // Log del asunto del mensaje.
    console.log("Cuerpo del mensaje:", cuerpoMensaje); // Log del cuerpo del mensaje.
    console.log("Destinatarios:", destinatarios); // Log de los destinatarios.

    // Valida que los datos obligatorios estén presentes.
    if (
      !asunto ||
      !cuerpoMensaje ||
      !destinatarios ||
      destinatarios.length === 0
    ) {
      return res.status(400).json({ message: "Faltan datos obligatorios" }); // Responde con un error 400 si faltan datos.
    }

    // Crea el mensaje en la base de datos.
    const mensaje = await handleCreateMensaje(req, res, currentUser);

    console.log({ "mensaje completo": mensaje, idMensaje: mensaje.idMensaje }); // Log del mensaje creado y su ID.

    // Agrega los destinatarios al mensaje.
    const destinatariosAdded = await agregarDestinatarios(
      currentUser.id,
      mensaje.idMensaje,
      destinatarios
    );

    // Responde con éxito si el mensaje y los destinatarios se agregaron correctamente.
    if (destinatariosAdded && mensaje) {
      res.status(201).json({idMensaje:mensaje.idMensaje});
    } else {
      res.status(500).json(true); // Responde con un error 500 si hubo un problema.
    }
  } catch (error) {
    console.error("Error al crear mensaje:", error); // Log del error.
    res.status(500).json({ message: "Error al crear mensaje", error }); // Responde con un error 500.
  }
};


// Controlador para enviar un mensaje.
export const sendRespuestaMensajeController = async (req, res) => {
  try {
    const currentUser = req.session.user; // Obtiene el usuario actual de la sesión.
    const {cuerpoMensaje} = req.body; // Extrae los datos del cuerpo de la solicitud.

    console.log("Usuario actual:", currentUser); // Log del usuario actual.
    console.log("Asunto:", asunto); // Log del asunto del mensaje.
    console.log("Cuerpo del mensaje:", cuerpoMensaje); // Log del cuerpo del mensaje.
    console.log("Destinatarios:", destinatarios); // Log de los destinatarios.

    // Valida que los datos obligatorios estén presentes.
    if (
      !asunto ||
      !cuerpoMensaje ||
      !destinatarios ||
      destinatarios.length === 0
    ) {
      return res.status(400).json({ message: "Faltan datos obligatorios" }); // Responde con un error 400 si faltan datos.
    }

    // Crea el mensaje en la base de datos.
    const mensaje = await handleCreateMensaje(req, res, currentUser);

    console.log({ "mensaje completo": mensaje, idMensaje: mensaje.idMensaje }); // Log del mensaje creado y su ID.

    // Agrega los destinatarios al mensaje.
    const destinatariosAdded = await agregarDestinatarios(
      currentUser.id,
      mensaje.idMensaje,
      destinatarios
    );

    // Responde con éxito si el mensaje y los destinatarios se agregaron correctamente.
    if (destinatariosAdded && mensaje) {
      res.status(201).json({idMensaje:mensaje.idMensaje});
    } else {
      res.status(500).json(true); // Responde con un error 500 si hubo un problema.
    }
  } catch (error) {
    console.error("Error al crear mensaje:", error); // Log del error.
    res.status(500).json({ message: "Error al crear mensaje", error }); // Responde con un error 500.
  }
};
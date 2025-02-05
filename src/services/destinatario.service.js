import {
  getUltimoConsecDestinatario,
  insertarDestinatario,
} from "../repositories/destinatario.dao.js";
import { getCountryByDomain } from "../services/pais.service.js";
import { findContactByUser } from "../controllers/contact.controller.js";
import { getMensajeById } from "../repositories/mensaje.dao.js";
import { validationContact } from "./contacto.service.js";

export const agregarDestinatarios = async (
  currentUser,
  idMensaje,
  destinatarios
) => {
  try {
    let consecDestinatario = await getUltimoConsecDestinatario();

    for (const destinatario of destinatarios) {
      // Validar que el contacto sea válido
          console.log({"destinatario": destinatario})
          const idContacto = await validationContact(
            destinatario.correoContacto,
            destinatario.nombreContacto,
            currentUser
          );
          
          console.log("ID de contacto validado:", idContacto);
      if (!idContacto) {
        throw new Error(
          `El contacto con email ${destinatario.correoContacto} no es válido.`
        );
      }

      // Obtener información del mensaje
      const mensajeCompleto = await getMensajeById(idMensaje);
      if (!mensajeCompleto) {
        throw new Error(`No se encontró el mensaje con ID: ${idMensaje}`);
      }
      console.log({mensaje: mensajeCompleto})
      console.log({usuario: mensajeCompleto.usuario})

      const usuario = mensajeCompleto.usuario;

      console.log(
        "usuario es:" + usuario + "y usuario loggeado es: " + currentUser
      );

      // Obtener el país a partir del email
      const pais = await getCountryByDomain(destinatario.correoContacto);
      if (!pais) {
        throw new Error(
          `No se pudo determinar el país para el email: ${destinatario.correoContacto}`
        );
      }

      console.log(
        "consecDestinatario:",
        consecDestinatario,
        "Contacto ID:",
        idContacto,
        "Usuario:",
        usuario,
        "Mensaje ID:",
        idMensaje,
        "País:",
        pais.idpais,
        "Tipo Copia",
        destinatario.idTipoCopia
      );

      // Insertar destinatario en la base de datos
      const destinatarioCheck = insertarDestinatario(consecDestinatario,
        destinatario.idTipoCopia,
        idContacto,
        usuario,
        idMensaje,
        pais.idpais)

      consecDestinatario++; // Incrementar para el siguiente destinatario
    }
    return true;
  } catch (error) {
    console.error("Error en el servicio al agregar destinatarios:", error);
    throw error;
  }
};

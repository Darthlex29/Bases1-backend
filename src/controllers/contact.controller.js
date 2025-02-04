// Importación de funciones desde el módulo de acceso a datos (DAO) y el servicio de validación de contactos.
import {
  getAllContacts,
  getContactByEmail,
  getContactById,
  getContactByUser,
} from "../repositories/contact.dao.js";
import { validationContact } from "../services/contacto.service.js";

// Controlador para obtener todos los contactos.
export const findAll = async (req, res) => {
  try {
    const contacts = await getAllContacts(); // Obtiene todos los contactos.
    res.status(200).json(contacts); // Responde con la lista de contactos.
  } catch (error) {
    console.error("Error al consultar contactos:", error); // Log del error.
    res.status(500).json({ message: "Error al consultar contactos", error }); // Responde con un error 500.
  }
};

// Controlador para buscar un contacto por su correo electrónico.
export const findContactByEmail = async (req, res) => {
  try {
    const { correoContacto } = req.body; // Extrae el correo del cuerpo de la solicitud.
    const contact = await getContactByEmail(correoContacto); // Busca el contacto por correo.

    if (contact) {
      res.status(200).json(contact); // Si se encuentra, responde con el contacto.
    } else {
      res.status(404).json({ message: "contacto no encontrado" }); // Si no, responde con un error 404.
    }
  } catch (error) {
    console.error("Error al consultar contactos:", error); // Log del error.
    res.status(500).json({ message: "Error al consultar contactos", error }); // Responde con un error 500.
  }
};

// Controlador para buscar un contacto por el ID del usuario actual.
export const findContactByUser = async (req, res) => {
  try {
    const currentUser = req.session.user; // Obtiene el usuario actual de la sesión.
    const contact = await getContactByUser(currentUser.id); // Busca el contacto por el ID del usuario.

    if (contact) {
      res.status(200).json(contact); // Si se encuentra, responde con el contacto.
    } else {
      res.status(404).json({ message: "Contacto no encontrado" }); // Si no, responde con un error 404.
    }
  } catch (error) {
    console.error("Error al consultar contactos:", error); // Log del error.
    res.status(500).json({ message: "Error al consultar contactos", error }); // Responde con un error 500.
  }
};

// Controlador para buscar un contacto por su ID.
export const findContactById = async (req, res) => {
  try {
    const consecContacto = req.body[0].consecContacto; // Extrae el ID del contacto del cuerpo de la solicitud.
    console.log(consecContacto); // Log del ID del contacto.
    const contact = await getContactById(consecContacto); // Busca el contacto por su ID.

    if (contact) {
      res.status(200).json(contact); // Si se encuentra, responde con el contacto.
    } else {
      res.status(404).json({ message: "Contacto no encontrado" }); // Si no, responde con un error 404.
    }
  } catch (error) {
    console.error("Error al consultar contactos:", error); // Log del error.
    res.status(500).json({ message: "Error al consultar contactos", error }); // Responde con un error 500.
  }
};

// Controlador para agregar un nuevo contacto.
export const addNewContact = async (req, res) => {
  try {
    const currentUser = req.session.user; // Obtiene el usuario actual de la sesión.
    console.log("Usuario logueado:", currentUser.id); // Log del ID del usuario.
    const contactos = req.body; // Obtiene los contactos del cuerpo de la solicitud.

    if (currentUser) {
      if (contactos && contactos.length > 0) {
        for (const contacto of contactos) {
          const { nombreContacto, correoContacto } = contacto; // Extrae el nombre y correo del contacto.
          console.log(
            "Nombre de Contacto:",
            nombreContacto === "" ? null : nombreContacto // Log del nombre del contacto.
          );
          console.log("Correo de Contacto:", correoContacto); // Log del correo del contacto.
          console.log(
            "Usuario:",
            currentUser,
            "Correo de contacto: " + correoContacto // Log del usuario y correo del contacto.
          );

          // Valida el contacto.
          const contact = await validationContact(
            correoContacto,
            nombreContacto,
            currentUser.id
          );

          if (contact) {
            console.log("Contacto validado exitosamente"); // Log de éxito en la validación.
          } else {
            console.log("No se pudo validar el contacto"); // Log de fallo en la validación.
            return res
              .status(400)
              .json({ message: "No se pudo agregar el contacto" }); // Responde con un error 400.
          }
        }

        return res.status(201).send("Datos de los contactos recibidos."); // Responde con éxito.
      } else {
        return res.status(400).send("No se recibieron contactos."); // Responde con un error 400 si no se recibieron contactos.
      }
    } else {
      return res.status(401).send("No se ha iniciado sesión."); // Responde con un error 401 si no hay sesión iniciada.
    }
  } catch (error) {
    console.error("Error en createContactController:", error); // Log del error.
    return res.status(500).json({ message: "Error al crear contacto" }); // Responde con un error 500.
  }
};

// Controlador para crear un contacto (sin uso).
export const create_Contact1 = async (req, res) => {
  try {
    const {
      consecContacto,
      usuario,
      usuUsuario,
      nombreContacto,
      correoContacto,
    } = req.body; // Extrae los datos del cuerpo de la solicitud.

    // Crea el contacto.
    const contact = await create_Contact({
      consecContacto,
      usuario,
      usuUsuario,
      nombreContacto,
      correoContacto,
    });

    if (contact) {
      return res.status(201).json({ message: "Contacto creado exitosamente" }); // Responde con éxito.
    } else {
      return res.status(400).json({ message: "No se pudo crear el contacto" }); // Responde con un error 400.
    }
  } catch (error) {
    console.error("Error en createContactController:", error); // Log del error.
    res.status(500).json({ message: "Error al crear contacto" }); // Responde con un error 500.
  }
};
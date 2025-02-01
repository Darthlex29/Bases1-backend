import {
  getAllContacts,
  getContactByEmail,
  getContactByUser
} from "../repositories/contact.dao.js";
import { validationContact } from "../services/contacto.service.js";

export const findAll = async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error al consultar usuarios:", error);
    res.status(500).json({ message: "Error al consultar usuarios", error });
  }
};

export const findContactByEmail = async (req, res) => {
  try {
    const { correoContacto } = req.body;
    const contact = await getContactByEmail(correoContacto);

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al consultar usuarios:", error);
    res.status(500).json({ message: "Error al consultar usuarios", error });
  }
};

export const findContactByUser = async (req, res) => {
  try {
    const currentUser  = req.session.user;
    const contact = await getContactByUser(currentUser.id)
    

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al consultar usuarios:", error);
    res.status(500).json({ message: "Error al consultar usuarios", error });
  }
  
}

export const addNewContact = async (req, res) => {
  try {
    const currentUser = req.session.user;
    console.log("Usuario logueado:", currentUser.id);
    const contactos = req.body;
    if (currentUser) {
      if (contactos && contactos.length > 0) {
        for (const contacto of contactos) {
          const { nombreContacto, correoContacto } = contacto;
          console.log(
            "Nombre de Contacto:",
            nombreContacto === "" ? null : nombreContacto
          );
          console.log("Correo de Contacto:", correoContacto);
          console.log(
            "Usuario:",
            currentUser,
            "Correo de contacto: " + correoContacto
          );

          const contact = await validationContact(
            correoContacto,
            nombreContacto,
            currentUser.id
          );

          if (contact) {
            console.log("Contacto validado exitosamente");
          } else {
            console.log("No se pudo validar el contacto");
            return res
              .status(400)
              .json({ message: "No se pudo agregar el contacto" });
          }
        }

        return res.status(201).send("Datos de los contactos recibidos.");
      } else {
        return res.status(400).send("No se recibieron contactos.");
      }
    } else {
      return res.status(401).send("No se ha iniciado sesión.");
    }
  } catch (error) {
    console.error("Error en createContactController:", error);
    return res.status(500).json({ message: "Error al crear contacto" });
  }
};

export const create_Contact1 = async (req, res) => {
  try {
    const {
      consecContacto,
      usuario,
      usuUsuario,
      nombreContacto,
      correoContacto,
    } = req.body;

    const contact = await create_Contact({
      consecContacto,
      usuario,
      usuUsuario,
      nombreContacto,
      correoContacto,
    });

    if (contact) {
      return res.status(201).json({ message: "Contacto creado exitosamente" });
    } else {
      return res.status(400).json({ message: "No se pudo crear el contacto" });
    }
  } catch (error) {
    console.error("Error en createContactController:", error);
    res.status(500).json({ message: "Error al crear contacto" });
  }
};

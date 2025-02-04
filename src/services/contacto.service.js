import {
  getContactByEmail,
  createContact,
  getContactByEmailAndUser,
  getIdForContactEmail,
  getNextConsecutivo
} from "../repositories/contact.dao.js";
import { getUserByEmail } from "../repositories/user.dao.js";

// Función para validar y registrar un contacto en la base de datos
export const validationContact = async (email, nombre, currentUser) => {
  try {
    // Verificar si el correo pertenece a un usuario registrado
    const user = await getUserByEmail(email);
    
    // Verificar si el contacto ya existe en la base de datos
    const contactOfUser = await getContactByEmail(email);
    const contactOfUserByEmail = await getContactByEmailAndUser(
      currentUser,
      email
    );
    const consecContacto = await getNextConsecutivo();

    // Si el contacto ya existe para este usuario, devolver su ID
    if (contactOfUserByEmail.length > 0) {
      console.log("El contacto ya existe para este usuario.");
      console.log("IdUser = " + contactOfUserByEmail[0].conseccontacto);
      return contactOfUserByEmail[0].conseccontacto;
    }
    // Si el correo pertenece a un usuario registrado pero no está en contactos, agregarlo
    else if (user && !contactOfUser) {
      console.log("El contacto no existe pero sí es usuario");
      const newContact = {
        consecContacto: consecContacto,
        usuario: currentUser,
        usuUsuario: user.usuario,
        nombreContacto: user.nombre,
        correoContacto: email,
      };
      console.log(newContact);
      await createContact(newContact);
      const conseccontacto = await getIdForContactEmail(
        newContact.correoContacto
      );
      console.log("idUser = " + conseccontacto);
      return conseccontacto;
    }
    // Si el correo no pertenece a un usuario ni existe en contactos, registrarlo como nuevo contacto
    else if (!user && !contactOfUser) {
      console.log("El contacto no existe, ni es usuario");
      const newContact = {
        consecContacto: consecContacto,
        usuario: currentUser,
        usuUsuario: null,
        nombreContacto: nombre,
        correoContacto: email,
      };
      console.log(newContact);
      await createContact(newContact);
      const conseccontacto = await getIdForContactEmail(
        newContact.correoContacto
      );
      console.log("idUser = " + conseccontacto);
      return conseccontacto;
    }
    // En caso de que ninguna condición se cumpla, lanzar un error
    else {
      console.log("No entra en ningún caso");
      throw new Error("No se pudo validar el contacto");
    }
  } catch (error) {
    console.error("Error en validationContact:", error);
    throw new Error("Error al procesar el contacto");
  }
};

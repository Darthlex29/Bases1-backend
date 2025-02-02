import {
  getContactByEmail,
  createContact,
  getContactByEmailAndUser,
  getIdForContactEmail,
} from "../repositories/contact.dao.js";
import { getUserByEmail } from "../repositories/user.dao.js";

export const validationContact = async (email, nombre, currentUser) => {
  try {
    const user = await getUserByEmail(email);
    const contactOfUser = await getContactByEmail(email);
    const contactOfUserByEmail = await getContactByEmailAndUser(
      currentUser,
      email
    );
    if (contactOfUserByEmail.length > 0) {
      console.log("El contacto ya existe para este usuario. ");
      console.log("IdUser = " + contactOfUserByEmail[0].conseccontacto);
      return contactOfUserByEmail[0].conseccontacto;
    } else if (user && !contactOfUser) {
      console.log("El contacto no existe pero si es usuario");
      const newContact = {
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
    } else if (!user && !contactOfUser) {
      console.log("El contacto no existe, ni es usuario");
      const newContact = {
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
    } else {
      console.log("No entra en ningun caso");
      throw new Error("No se pudo validar el contacto");
    }
  } catch (error) {
    console.error("Error en validationContact:", error);
    throw new Error("Error al procesar el contacto");
  }
};

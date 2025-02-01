import {
  getContactByEmail,
  createContact,
} from "../repositories/contact.dao.js";
import { getUserByEmail } from "../repositories/user.dao.js";

export const validationContact = async (email, nombre, usuario) => {
  try {
    const user = await getUserByEmail(email);
    const contactOfUser = await getContactByEmail(email);
    console.log("primeringreso");

    if (user && !contactOfUser) {
      console.log("El contacto no existe pero el usuario si");
      const newContact = {
        usuario: usuario,
        usuUsuario: user.usuario,
        nombreContacto: user.nombre,
        correoContacto: email,
      };
      const contactCreated = await createContact(newContact);
      return contactCreated;
    } else if (!user && !contactOfUser) {
      console.log("El contacto no existe");
      const newContact = {
        usuario: usuario,
        usuUsuario: null,
        nombreContacto: nombre,
        correoContacto: email,
      };
      const contactCreated = await createContact(newContact);
      return contactCreated;
    } else if ((user && contactOfUser) || (!user && contactOfUser)) {
      console.log("El contacto ya existe");
      if (contactOfUser.usuario === usuario) {
        console.log("El contacto ya existe para el usuario logueado");
        return contactOfUser;
      } else {
        console.log("El contacto ya existe para otro usuario");
        const newContact = {
          usuario: usuario,
          usuUsuario: null,
          nombreContacto: nombre,
          correoContacto: email,
        };
        const contactCreated = await createContact(newContact);
        return contactCreated;
        
      }
    }
  } catch (error) {
    console.error("Error en validationContact:", error);
    throw new Error("Error al procesar el contacto");
  }
};

import pool from "../utils/dbConnect.js";

export const getAllContacts = async () => {
  try {
    const contacts = await pool.query("select * from contacto");
    return contacts.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar contactos:", error);
    throw error;
  }
};

export const getContactByEmail = async (email) => {
  try {
    const result = await pool.query(
      "SELECT * FROM contacto WHERE correocontacto like $1",
      [email]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error en el DAO al consultar contactos:", error);
    throw error;
  }
};

export const getContactByUser = async (currentUser) => {
  try {
    const result = await pool.query(
      "SELECT * FROM contacto WHERE usuario like $1",
      [currentUser]
    );
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar contactos:", error);
    throw error;
  }
};

export const createContact = async ({
  usuario,
  usuUsuario,
  nombreContacto,
  correoContacto,
}) => {
  try {
    const result = await pool.query(
      "INSERT INTO CONTACTO (USUARIO, USU_USUARIO, NOMBRECONTACTO, CORREOCONTACTO) VALUES ($1, $2, $3, $4)",
      [usuario, usuUsuario, nombreContacto, correoContacto]
    );
    console.log("Contacto insertado:", result.rows[0]);
    return true;
  } catch (error) {
    console.error("Error en el DAO al insertar contacto:", error);
    throw error; // Se propaga el error para que lo maneje la capa superior
  }
};

export const updateContact = async (id, { nombreContacto, correoContacto }) => {
  try {
    const result = await pool.query(
      "UPDATE contacto SET nombrecontacto = $1, correocontacto = $2 WHERE id = $3",
      [nombreContacto, correoContacto, id]
    );
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error en el DAO al actualizar contacto:", error);
    throw error;
  }
};

export const deleteContact = async (id) => {
  try {
    const result = await pool.query("DELETE FROM contacto WHERE id = $1", [id]);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error en el DAO al eliminar contacto:", error);
    throw error;
  }
};

export const deleteContactByEmail = async (email) => {
  try {
    const result = await pool.query(
      "DELETE FROM contacto WHERE correocontacto like $1",
      [email]
    );
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error en el DAO al eliminar contacto:", error);
    throw error;
  }
};

import pool from "../utils/dbConnect.js";

// Función para obtener todos los contactos
export const getAllContacts = async () => {
  try {
    const contacts = await pool.query("select * from contacto");
    return contacts.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar contactos:", error);
    throw error;
  }
};

// Función para obtener un contacto por correo electrónico
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

// Función para obtener los contactos de un usuario específico
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

// Función para obtener un contacto por su ID
export const getContactById = async (consecContacto) => {
  try {
    const result = await pool.query(
      "SELECT * FROM contacto WHERE consecContacto = $1",
      [consecContacto]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error en el DAO al consultar contactos:", error);
    throw error;
  }
};

// Función para obtener un contacto por usuario y correo electrónico
export const getContactByEmailAndUser = async (currentUser, email) => {
  try {
    const result = await pool.query(
      "SELECT * FROM CONTACTO WHERE USUARIO LIKE $1 AND correocontacto like $2",
      [currentUser, email]
    );
    return result.rows;
  }catch (error) {
    console.error("Error en el DAO al consultar contactos:", error);
    throw error;
  }
}

// Función para obtener el ID de un contacto por su correo electrónico
export const getIdForContactEmail = async (correocontacto) => {
  try {
    const result = await pool.query(
      "SELECT conseccontacto FROM contacto WHERE correocontacto = $1",
      [correocontacto]
    );
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar contactos:", error);
    throw error;
  }
};

// Función para crear un nuevo contacto en la base de datos
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

// Función para actualizar los datos de un contacto
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

// Función para eliminar un contacto por su ID
export const deleteContact = async (id) => {
  try {
    const result = await pool.query("DELETE FROM contacto WHERE id = $1", [id]);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error en el DAO al eliminar contacto:", error);
    throw error;
  }
};

// Función para eliminar un contacto por su correo electrónico
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

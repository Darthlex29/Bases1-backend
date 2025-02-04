import pool from "../utils/dbConnect.js";

// Obtener todos los contactos
export const getAllContacts = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute("SELECT * FROM CONTACTO");
    return result.rows.map((row) => Object.fromEntries(result.metaData.map((col, i) => [col.name.toLowerCase(), row[i]])));
  } catch (error) {
    console.error("Error en el DAO al consultar contactos:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

// Obtener un contacto por correo electrónico
export const getContactByEmail = async (email) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM CONTACTO WHERE CORREOCONTACTO LIKE :email",
      { email }
    );
    return result.rows.length ? Object.fromEntries(result.metaData.map((col, i) => [col.name.toLowerCase(), result.rows[0][i]])) : null;
  } catch (error) {
    console.error("Error en el DAO al consultar contactos:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

// Obtener contactos por usuario
export const getContactByUser = async (currentUser) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM CONTACTO WHERE USUARIO LIKE :currentUser",
      { currentUser }
    );
    return result.rows.map((row) => Object.fromEntries(result.metaData.map((col, i) => [col.name.toLowerCase(), row[i]])));
  } catch (error) {
    console.error("Error en el DAO al consultar contactos:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

// Obtener contacto por ID
export const getContactById = async (consecContacto) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM CONTACTO WHERE CONSECCONTACTO = :consecContacto",
      { consecContacto }
    );
    return result.rows.length ? Object.fromEntries(result.metaData.map((col, i) => [col.name.toLowerCase(), result.rows[0][i]])) : null;
  } catch (error) {
    console.error("Error en el DAO al consultar contactos:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

// Obtener contacto por usuario y correo
export const getContactByEmailAndUser = async (currentUser, email) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM CONTACTO WHERE USUARIO LIKE :currentUser AND CORREOCONTACTO LIKE :email",
      { currentUser, email }
    );
    return result.rows.map((row) => Object.fromEntries(result.metaData.map((col, i) => [col.name.toLowerCase(), row[i]])));
  } catch (error) {
    console.error("Error en el DAO al consultar contactos:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

// Obtener ID del contacto por email
export const getIdForContactEmail = async (correoContacto) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT CONSECCONTACTO FROM CONTACTO WHERE CORREOCONTACTO = :correoContacto",
      { correoContacto }
    );
    return result.rows.map((row) => row[0]);
  } catch (error) {
    console.error("Error en el DAO al consultar contactos:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

// Crear nuevo contacto
export const createContact = async ({
  consecContacto,
  usuario,
  usuUsuario,
  nombreContacto,
  correoContacto,
}) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.execute(
      "INSERT INTO CONTACTO (CONSECCONTACTO, USUARIO, USU_USUARIO, NOMBRECONTACTO, CORREOCONTACTO) VALUES (:usuario, :usuUsuario, :nombreContacto, :correoContacto)",
      { consecContacto, usuario, usuUsuario, nombreContacto, correoContacto },
      { autoCommit: true }
    );
    return true;
  } catch (error) {
    console.error("Error en el DAO al insertar contacto:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

// Actualizar contacto
export const updateContact = async (id, { nombreContacto, correoContacto }) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "UPDATE CONTACTO SET NOMBRECONTACTO = :nombreContacto, CORREOCONTACTO = :correoContacto WHERE CONSECCONTACTO = :id",
      { nombreContacto, correoContacto, id },
      { autoCommit: true }
    );
    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error en el DAO al actualizar contacto:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

// Eliminar contacto por ID
export const deleteContact = async (id) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "DELETE FROM CONTACTO WHERE CONSECCONTACTO = :id",
      { id },
      { autoCommit: true }
    );
    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error en el DAO al eliminar contacto:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

// Eliminar contacto por email
export const deleteContactByEmail = async (email) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "DELETE FROM CONTACTO WHERE CORREOCONTACTO LIKE :email",
      { email },
      { autoCommit: true }
    );
    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error en el DAO al eliminar contacto:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

export const getNextConsecutivo = async () => {
  let connection;
  try {
    connection = await pool.getConnection();

    // Obtener el último consecutivo
    const result = await connection.execute(
      `SELECT MAX(consecContacto) AS ultimo FROM contacto`
    );
    console.log(result.rows);
    const ultimoConsecutivo = result.rows[0]
    if(ultimoConsecutivo === null){
      ultimoConsecutivo = 0
    }
    const consecutivoId = parseInt(ultimoConsecutivo, 10)
    return consecutivoId + 1; // Retorna el siguiente consecutivo

  } catch (error) {
    console.error("Error al obtener el consecutivo:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};
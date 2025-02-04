import pool from "../utils/dbConnect.js";
import oracledb from "oracledb";

const formatRows = (rows) => {
  return rows.map((row) => {
    const formattedRow = {};
    for (let key in row) {
      formattedRow[key.toLowerCase()] = row[key];
    }
    return formattedRow;
  });
};

export const getAllContacts = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute("SELECT * FROM CONTACTO", [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });
    return formatRows(result.rows);
  } catch (error) {
    console.error("Error al obtener contactos:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

export const getContactByEmail = async (email) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM CONTACTO WHERE CORREOCONTACTO LIKE :email",
      [email],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows.length ? formatRows(result.rows)[0] : null;
  } catch (error) {
    console.error("Error al obtener contacto por email:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

export const getContactByUser = async (currentUser) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM CONTACTO WHERE USUARIO LIKE :currentUser",
      [currentUser],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return formatRows(result.rows);
  } catch (error) {
    console.error("Error al obtener contactos por usuario:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

export const getContactById = async (consecContacto) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM CONTACTO WHERE CONSECCONTACTO = :consecContacto",
      [consecContacto],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows.length ? formatRows(result.rows)[0] : null;
  } catch (error) {
    console.error("Error al obtener contacto por ID:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

export const getContactByEmailAndUser = async (currentUser, email) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM CONTACTO WHERE USUARIO LIKE :currentUser AND CORREOCONTACTO LIKE :email",
      { currentUser, email }
    );
    return result.rows.map((row) =>
      Object.fromEntries(
        result.metaData.map((col, i) => [col.name.toLowerCase(), row[i]])
      )
    );
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
      "INSERT INTO CONTACTO (CONSECCONTACTO, USUARIO, USU_USUARIO, NOMBRECONTACTO, CORREOCONTACTO) VALUES (:consecContacto, :usuario, :usuUsuario, :nombreContacto, :correoContacto)",
      { consecContacto, usuario, usuUsuario, nombreContacto, correoContacto },
      { autoCommit: true }
    );
    return true;
  } catch (error) {
    console.error("Error al crear contacto:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

export const updateContact = async (id, updateData) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "UPDATE CONTACTO SET NOMBRECONTACTO = :nombreContacto, CORREOCONTACTO = :correoContacto WHERE CONSECCONTACTO = :id",
      { ...updateData, id },
      { autoCommit: true }
    );
    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error al actualizar contacto:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

export const deleteContact = async (id) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "DELETE FROM CONTACTO WHERE CONSECCONTACTO = :id",
      [id],
      { autoCommit: true }
    );
    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error al eliminar contacto:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

export const getNextConsecutivo = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT MAX(CONSECCONTACTO) AS ultimo FROM CONTACTO",
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    console.log(result.rows[0].ULTIMO);
    let ultimoConsecutivo = result.rows[0].ULTIMO;

    console.log({ ultimoConsecutivo: ultimoConsecutivo });
    if (ultimoConsecutivo === null) {
      ultimoConsecutivo = 0;
    }else{
      ultimoConsecutivo++;
    }
    const consecutivoId = parseInt(ultimoConsecutivo, 10);
    console.log(consecutivoId);

    return consecutivoId; // Retorna el siguiente consecutivo
  } catch (error) {
    console.error("Error al obtener el consecutivo:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

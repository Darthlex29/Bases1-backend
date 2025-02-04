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
    const result = await connection.execute(
      "SELECT * FROM CONTACTO",
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
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

export const createContact = async (contactData) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const query = `
      INSERT INTO CONTACTO (CONSECCONTACTO, USUARIO, USU_USUARIO, NOMBRECONTACTO, CORREOCONTACTO) 
      VALUES (:consecContacto, :usuario, :usuUsuario, :nombreContacto, :correoContacto)`;
    
    const options = { autoCommit: true };
    const result = await connection.execute(query, contactData, options);
    return result.rowsAffected > 0;
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
      "SELECT MAX(CONSECCONTACTO) AS ULTIMO FROM CONTACTO",
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return (result.rows[0]?.ultimo || 0) + 1;
  } catch (error) {
    console.error("Error al obtener el consecutivo:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

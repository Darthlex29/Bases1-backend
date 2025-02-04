import pool from "../utils/dbConnect.js";
import oracledb from "oracledb";

// Obtener todos los tipos de copia
export const getAllTipoCopia = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM TIPOCOPIA",
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    return result.rows.map((row) => {
      const lowerCaseRow = {};
      for (let key in row) {
        lowerCaseRow[key.toLowerCase()] = row[key];
      }
      return lowerCaseRow;
    });
  } catch (error) {
    console.error("Error en el DAO al consultar tipos de copia:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Obtener tipo de copia por ID
export const getTipoCopiaById = async (id) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM TIPOCOPIA WHERE IDTIPOCOPIA = :id",
      [id],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const row = result.rows[0];
    if (row) {
      const lowerCaseRow = {};
      for (let key in row) {
        lowerCaseRow[key.toLowerCase()] = row[key];
      }
      return lowerCaseRow;
    }
    return null;
  } catch (error) {
    console.error("Error en el DAO al consultar tipo de copia:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Crear nuevo tipo de copia
export const createTipoCopia = async ({ idTipoCopia, descTipoCopia }) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.execute(
      "INSERT INTO TIPOCOPIA (IDTIPOCOPIA, DESCTIPOCOPIA) VALUES (:idTipoCopia, :descTipoCopia)",
      { idTipoCopia, descTipoCopia },
      { autoCommit: true }
    );
    return true;
  } catch (error) {
    console.error("Error en el DAO al insertar tipo de copia:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Actualizar tipo de copia
export const updateTipoCopia = async (id, data) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const fields = [];
    const values = { id };

    if (data.descTipoCopia !== undefined) {
      fields.push("DESCTIPOCOPIA = :descTipoCopia");
      values.descTipoCopia = data.descTipoCopia;
    }

    if (fields.length === 0) {
      return false;
    }

    const query = `UPDATE TIPOCOPIA SET ${fields.join(", ")} WHERE IDTIPOCOPIA = :id`;
    const result = await connection.execute(query, values, { autoCommit: true });
    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error en el DAO al actualizar tipo de copia:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Eliminar tipo de copia
export const deleteTipoCopia = async (id) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "DELETE FROM TIPOCOPIA WHERE IDTIPOCOPIA = :id",
      [id],
      { autoCommit: true }
    );
    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error en el DAO al eliminar tipo de copia:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};
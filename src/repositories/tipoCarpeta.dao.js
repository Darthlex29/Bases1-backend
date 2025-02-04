import pool from "../utils/dbConnect.js";
import oracledb from "oracledb";

export const getAllTipoCarpetas = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM tipoCarpeta",
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    return result.rows.map((row) => {
      const rowLowerCase = {};
      for (let key in row) {
        rowLowerCase[key.toLowerCase()] = row[key];
      }
      return rowLowerCase;
    });
  } catch (error) {
    console.error("Error al obtener tipos de carpeta:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const getTipoCarpetaById = async (id) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM tipoCarpeta WHERE idTipoCarpeta = :id",
      [id],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    
    const row = result.rows[0];
    if (!row) return null;

    const rowLowerCase = {};
    for (let key in row) {
      rowLowerCase[key.toLowerCase()] = row[key];
    }
    return rowLowerCase;
  } catch (error) {
    console.error("Error al obtener tipo de carpeta por ID:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const createTipoCarpeta = async ({ idtipocarpeta, desctipocarpeta }) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.execute(
      "INSERT INTO tipoCarpeta (idTipoCarpeta, descTipoCarpeta) VALUES (:id, :desc)",
      [idtipocarpeta, desctipocarpeta],
      { autoCommit: true }
    );
    return true;
  } catch (error) {
    console.error("Error al insertar tipo de carpeta:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const updateTipoCarpeta = async (id, data) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const fields = [];
    const values = {};

    if (data.idtipocarpeta !== undefined) {
      fields.push("idTipoCarpeta = :idtipocarpeta");
      values.idtipocarpeta = data.idtipocarpeta;
    }
    if (data.desctipocarpeta !== undefined) {
      fields.push("descTipoCarpeta = :desctipocarpeta");
      values.desctipocarpeta = data.desctipocarpeta;
    }

    if (fields.length === 0) {
      return false;
    }

    values.id = id;
    const query = `UPDATE tipoCarpeta SET ${fields.join(", ")} WHERE idTipoCarpeta = :id`;
    const result = await connection.execute(query, values, { autoCommit: true });

    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error al actualizar tipo de carpeta:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const deleteTipoCarpeta = async (id) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "DELETE FROM tipoCarpeta WHERE idTipoCarpeta = :id",
      [id],
      { autoCommit: true }
    );
    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error al eliminar tipo de carpeta:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};
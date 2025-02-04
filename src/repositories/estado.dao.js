import pool from "../utils/dbConnect.js";
import oracledb from "oracledb";

export const getEstadoById = async (id) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM ESTADO WHERE idEstado = :id",
      [id],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const estado = result.rows[0];
    if (estado) {
      const estadoLowerCase = {};
      for (let key in estado) {
        estadoLowerCase[key.toLowerCase()] = estado[key];
      }
      return estadoLowerCase;
    }
    return null;
  } catch (error) {
    console.error("Error en el DAO al consultar estado:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const getAllEstados = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM ESTADO",
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const estados = result.rows.map((estado) => {
      const estadoLowerCase = {};
      for (let key in estado) {
        estadoLowerCase[key.toLowerCase()] = estado[key];
      }
      return estadoLowerCase;
    });

    return estados;
  } catch (error) {
    console.error("Error en el DAO al consultar estados:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

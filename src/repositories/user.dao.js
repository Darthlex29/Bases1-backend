import pool from "../utils/dbConnect.js";
import oracledb from "oracledb";

export const getAllUsers = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM USUARIO",
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT } // Devuelve resultados como objetos con claves
    );

    // Convertir todas las claves del objeto a minúsculas para consistencia
    const users = result.rows.map((user) => {
      const userLowerCase = {};
      for (let key in user) {
        userLowerCase[key.toLowerCase()] = user[key];
      }
      return userLowerCase;
    });

    return users;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};


export const getUserByEmail = async (correoalterno) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM usuario WHERE correoalterno LIKE :correoalterno",
      [correoalterno],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    console.log({ resultado: result.rows[0] });
    const user = result.rows[0];
    if (user) {
      const userLowerCase = {};
      for (let key in user) {
        userLowerCase[key.toLowerCase()] = user[key];  // Convertir claves a minúsculas
      }
      return userLowerCase;  // Devolver el objeto con las claves en minúsculas
    }
    return null;
  } catch (error) {
    console.error("Error al obtener usuario por email:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const getUserByUsuario = async (usuario) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM usuario WHERE usuario LIKE :usuario",
      [usuario],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    console.log({ resultado: result.rows[0] });
    const user = result.rows[0];
    if (user) {
      const userLowerCase = {};
      for (let key in user) {
        userLowerCase[key.toLowerCase()] = user[key];  // Convertir claves a minúsculas
      }
      return userLowerCase;  // Devolver el objeto con las claves en minúsculas
    }
    return null;
  } catch (error) {
    console.error("Error al obtener usuario por email:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};
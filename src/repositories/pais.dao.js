import pool from "../utils/dbConnect.js";
import oracledb from "oracledb";

export const getAllPaises = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM PAIS",
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    return result.rows.map((pais) => {
      const paisLowerCase = {};
      for (let key in pais) {
        paisLowerCase[key.toLowerCase()] = pais[key];
      }
      return paisLowerCase;
    });
  } catch (error) {
    console.error("Error al obtener países:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const getPaisById = async (idpais) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM PAIS WHERE IDPAIS = :idpais",
      [idpais],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    
    const pais = result.rows[0];
    if (pais) {
      const paisLowerCase = {};
      for (let key in pais) {
        paisLowerCase[key.toLowerCase()] = pais[key];
      }
      return paisLowerCase;
    }
    return null;
  } catch (error) {
    console.error("Error al obtener país por ID:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const getPaisByDominio = async (dominio) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM PAIS WHERE DOMINIO = :dominio",
      [dominio],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    
    const pais = result.rows[0];
    if (pais) {
      const paisLowerCase = {};
      for (let key in pais) {
        paisLowerCase[key.toLowerCase()] = pais[key];
      }
      return paisLowerCase;
    }
    return null;
  } catch (error) {
    console.error("Error al obtener país por dominio:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const createPais = async ({ idpais, nompais, dominio }) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.execute(
      "INSERT INTO PAIS (IDPAIS, NOMPAIS, DOMINIO) VALUES (:idpais, :nompais, :dominio)",
      { idpais, nompais, dominio },
      { autoCommit: true }
    );
    return true;
  } catch (error) {
    console.error("Error al insertar país:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const updatePais = async (idpais, data) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const campos = [];
    const valores = { idpais };

    if (data.nompais !== undefined) {
      campos.push("NOMPAIS = :nompais");
      valores.nompais = data.nompais;
    }
    if (data.dominio !== undefined) {
      campos.push("DOMINIO = :dominio");
      valores.dominio = data.dominio;
    }

    if (campos.length === 0) {
      return false;
    }

    const query = `UPDATE PAIS SET ${campos.join(", ")} WHERE IDPAIS = :idpais`;
    const result = await connection.execute(query, valores, {
      autoCommit: true,
    });

    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error al actualizar país:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const deletePais = async (idpais) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "DELETE FROM PAIS WHERE IDPAIS = :idpais",
      [idpais],
      { autoCommit: true }
    );

    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error al eliminar país:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

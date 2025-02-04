import pool from "../utils/dbConnect.js";
import oracledb from "oracledb";

export const getAllPaises = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute("SELECT * FROM PAIS", [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

    return result.rows.map((pais) => {
      const paisLowerCase = {};
      for (let key in pais) {
        paisLowerCase[key.toLowerCase()] = pais[key];
      }
      return paisLowerCase;
    });
  } catch (error) {
    console.error("Error en el DAO al consultar países:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const getPaisById = async (id) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM PAIS WHERE IDPAIS = :id",
      [id],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (result.rows.length > 0) {
      const pais = result.rows[0];
      const paisLowerCase = {};
      for (let key in pais) {
        paisLowerCase[key.toLowerCase()] = pais[key];
      }
      return paisLowerCase;
    }
    return null;
  } catch (error) {
    console.error("Error en el DAO al consultar país:", error);
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

    if (result.rows.length > 0) {
      const pais = result.rows[0];
      const paisLowerCase = {};
      for (let key in pais) {
        paisLowerCase[key.toLowerCase()] = pais[key];
      }
      return paisLowerCase;
    }
    return null;
  } catch (error) {
    console.error("Error en el DAO al consultar país por dominio:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const createPais = async ({ idPais, nomPais, dominio }) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.execute(
      "INSERT INTO PAIS (IDPAIS, NOMPAIS, DOMINIO) VALUES (:idPais, :nomPais, :dominio)",
      { idPais, nomPais, dominio },
      { autoCommit: true }
    );
    return true;
  } catch (error) {
    console.error("Error en el DAO al insertar país:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const updatePais = async (idPais, data) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const campos = [];
    const valores = { idPais };

    if (data.nomPais !== undefined) {
      campos.push("NOMPAIS = :nomPais");
      valores.nomPais = data.nomPais;
    }
    if (data.dominio !== undefined) {
      campos.push("DOMINIO = :dominio");
      valores.dominio = data.dominio;
    }

    if (campos.length === 0) {
      return false;
    }

    const query = `UPDATE PAIS SET ${campos.join(", ")} WHERE IDPAIS = :id`;
    const result = await connection.execute(query, valores, {
      autoCommit: true,
    });

    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error en el DAO al actualizar país:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const deletePais = async (idPais) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "DELETE FROM PAIS WHERE IDPAIS = :idPais",
      [idPais],
      { autoCommit: true }
    );

    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error en el DAO al eliminar país:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

import pool from "../utils/dbConnect.js";
import oracledb from "oracledb";

export const getAllCategorias = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM categoria",
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const categorias = result.rows.map((categoria) => {
      const categoriaLowerCase = {};
      for (let key in categoria) {
        categoriaLowerCase[key.toLowerCase()] = categoria[key];
      }
      return categoriaLowerCase;
    });

    return categorias;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const getCategoriaById = async (id) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM categoria WHERE idCategoria = :id",
      [id],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const categoria = result.rows[0];
    if (categoria) {
      const categoriaLowerCase = {};
      for (let key in categoria) {
        categoriaLowerCase[key.toLowerCase()] = categoria[key];
      }
      return categoriaLowerCase;
    }
    return null;
  } catch (error) {
    console.error("Error al obtener categoría por ID:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const createCategoria = async ({ idCategoria, desCategoria }) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.execute(
      "INSERT INTO categoria (idCategoria, desCategoria) VALUES (:idCategoria, :desCategoria)",
      { idCategoria, desCategoria },
      { autoCommit: true }
    );
    return true;
  } catch (error) {
    console.error("Error al insertar categoría:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const updateCategoria = async (id, data) => {
  let connection;
  try {
    connection = await pool.getConnection();

    const updates = [];
    const values = { id };

    if (data.idCategoria !== undefined) {
      updates.push("idCategoria = :idCategoria");
      values.idCategoria = data.idCategoria;
    }
    if (data.desCategoria !== undefined) {
      updates.push("desCategoria = :desCategoria");
      values.desCategoria = data.desCategoria;
    }

    if (updates.length === 0) {
      return false;
    }

    const query = `UPDATE categoria SET ${updates.join(", ")} WHERE idCategoria = :id`;

    const result = await connection.execute(query, values, { autoCommit: true });

    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export const deleteCategoria = async (id) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "DELETE FROM categoria WHERE idCategoria = :id",
      [id],
      { autoCommit: true }
    );
    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

import pool from "../utils/dbConnect.js";

export const getAllCategorias = async () => {
  try {
    const result = await pool.query("SELECT * FROM categoria");
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar categorías:", error);
    throw error;
  }
};

export const getCategoriaById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM categoria WHERE idCategoria = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error en el DAO al consultar categoría:", error);
    throw error;
  }
};

export const createCategoria = async ({ idCategoria, desCategoria }) => {
  try {
    const result = await pool.query(
      "INSERT INTO categoria (idCategoria, desCategoria) VALUES ($1, $2)",
      [idCategoria, desCategoria]
    );
    return true;
  } catch (error) {
    console.error("Error en el DAO al insertar categoría:", error);
    throw error;
  }
};

export const updateCategoria = async (id, data) => {
  try {
    const campos = [];
    const valores = [];

    // Construir la consulta dinámicamente con los campos proporcionados
    if (data.idCategoria !== undefined) {
      campos.push(`idCategoria = $${campos.length + 1}`);
      valores.push(data.idCategoria);
    }
    if (data.desCategoria !== undefined) {
      campos.push(`desCategoria = $${campos.length + 1}`);
      valores.push(data.desCategoria);
    }

    // Si no hay campos a actualizar, retornar false
    if (campos.length === 0) {
      return false;
    }

    valores.push(id); // Agregar ID al final para la condición WHERE

    const query = `UPDATE categoria SET ${campos.join(", ")} WHERE idCategoria = $${
      valores.length
    }`;

    const result = await pool.query(query, valores);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error en el DAO al actualizar categoría:", error);
    throw error;
  }
};

export const deleteCategoria = async (id) => {
  try {
    const result = await pool.query("DELETE FROM categoria WHERE idCategoria = $1", [id]);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error en el DAO al eliminar categoría:", error);
    throw error;
  }
};
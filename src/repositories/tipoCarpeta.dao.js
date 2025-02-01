import pool from "../utils/dbConnect.js";

export const getAllTipoCarpetas = async () => {
  try {
    const result = await pool.query("SELECT * FROM tipoCarpeta");
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar tipos de carpeta:", error);
    throw error;
  }
};

export const getTipoCarpetaById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM tipoCarpeta WHERE idTipoCarpeta = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error en el DAO al consultar tipo de carpeta:", error);
    throw error;
  }
};

export const createTipoCarpeta = async ({ idTipoCarpeta, descTipoCarpeta }) => {
  try {
    const result = await pool.query(
      "INSERT INTO tipoCarpeta (idTipoCarpeta, descTipoCarpeta) VALUES ($1, $2)",
      [idTipoCarpeta, descTipoCarpeta]
    );
    return true;
  } catch (error) {
    console.error("Error en el DAO al insertar tipo de carpeta:", error);
    throw error;
  }
};

export const updateTipoCarpeta = async (id, data) => {
  try {
    const campos = [];
    const valores = [];

    // Construir la consulta dinámicamente con los campos proporcionados
    if (data.idTipoCarpeta !== undefined) {
      campos.push(`idTipoCarpeta = $${campos.length + 1}`);
      valores.push(data.idTipoCarpeta);
    }
    if (data.descTipoCarpeta !== undefined) {
      campos.push(`descTipoCarpeta = $${campos.length + 1}`);
      valores.push(data.descTipoCarpeta);
    }

    // Si no hay campos a actualizar, retornar false
    if (campos.length === 0) {
      return false;
    }

    valores.push(id); // Agregar ID al final para la condición WHERE

    const query = `UPDATE tipoCarpeta SET ${campos.join(", ")} WHERE idTipoCarpeta = $${
      valores.length
    }`;

    const result = await pool.query(query, valores);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error en el DAO al actualizar tipo de carpeta:", error);
    throw error;
  }
};

export const deleteTipoCarpeta = async (id) => {
  try {
    const result = await pool.query("DELETE FROM tipoCarpeta WHERE idTipoCarpeta = $1", [id]);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error en el DAO al eliminar tipo de carpeta:", error);
    throw error;
  }
};
import pool from "../utils/dbConnect.js";

// Obtener todos los tipos de copia
export const getAllTipoCopia = async () => {
  try {
    const result = await pool.query("SELECT * FROM TIPOCOPIA");
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar tipos de copia:", error);
    throw error;
  }
};

// Obtener tipo de copia por ID
export const getTipoCopiaById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM TIPOCOPIA WHERE IDTIPOCOPIA = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error en el DAO al consultar tipo de copia:", error);
    throw error;
  }
};

// Crear nuevo tipo de copia
export const createTipoCopia = async ({ idTipoCopia, descTipoCopia }) => {
  try {
    const result = await pool.query(
      "INSERT INTO TIPOCOPIA (IDTIPOCOPIA, DESCTIPOCOPIA) VALUES ($1, $2)",
      [idTipoCopia, descTipoCopia]
    );
    return true;
  } catch (error) {
    console.error("Error en el DAO al insertar tipo de copia:", error);
    throw error;
  }
};

// Actualizar tipo de copia
export const updateTipoCopia = async (id, data) => {
  try {
    const campos = [];
    const valores = [];

    // Construir la consulta dinámicamente con los campos proporcionados
    if (data.descTipoCopia !== undefined) {
      campos.push(`DESCTIPOCOPIA = $${campos.length + 1}`);
      valores.push(data.descTipoCopia);
    }

    // Si no hay campos a actualizar, retornar false
    if (campos.length === 0) {
      return false;
    }

    valores.push(id); // Agregar ID al final para la condición WHERE

    const query = `UPDATE TIPOCOPIA SET ${campos.join(", ")} WHERE IDTIPOCOPIA = $${valores.length}`;
    const result = await pool.query(query, valores);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error en el DAO al actualizar tipo de copia:", error);
    throw error;
  }
};

// Eliminar tipo de copia
export const deleteTipoCopia = async (id) => {
  try {
    const result = await pool.query("DELETE FROM TIPOCOPIA WHERE IDTIPOCOPIA = $1", [id]);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error en el DAO al eliminar tipo de copia:", error);
    throw error;
  }
};

import pool from "../utils/dbConnect.js";

export const getAllPaises = async () => {
  try {
    const result = await pool.query("SELECT * FROM pais");
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar paises:", error);
    throw error;
  }
};

export const getPaisById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM pais WHERE idpais like $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error en el DAO al consultar pais:", error);
    throw error;
  }
};

export const getPaisByDominio = async (dominio) => {
  try {
    const result = await pool.query(
      "SELECT * FROM pais WHERE dominio like $1",
      [dominio]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error en el DAO al consultar pais:", error);
    throw error;
  }
};

export const createPais = async ({ idPais, nomPais, dominio }) => {
  try {
    const result = await pool.query(
      "INSERT INTO pais (idpais, nomPais, dominio) VALUES ($1, $2, $3)",
      [idPais, nomPais, dominio]
    );
    return true;
  } catch (error) {
    console.error("Error en el DAO al insertar pais:", error);
    throw error;
  }
};

export const updatePais = async (id, data) => {
  try {
    const campos = [];
    const valores = [];

    // Construir la consulta dinámicamente con los campos proporcionados
    if (data.idPais !== undefined) {
      campos.push(`idpais = $${campos.length + 1}`);
      valores.push(data.idPais);
    }
    if (data.nomPais !== undefined) {
      campos.push(`nompais = $${campos.length + 1}`);
      valores.push(data.nomPais);
    }
    if (data.dominio !== undefined) {
      campos.push(`dominio = $${campos.length + 1}`);
      valores.push(data.dominio);
    }

    // Si no hay campos a actualizar, retornar false
    if (campos.length === 0) {
      return false;
    }

    valores.push(id); // Agregar ID al final para la condición WHERE

    const query = `UPDATE pais SET ${campos.join(", ")} WHERE idpais = $${
      valores.length
    }`;

    const result = await pool.query(query, valores);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error en el DAO al actualizar pais:", error);
    throw error;
  }
};

export const deletePais = async (id) => {
  try {
    const result = await pool.query("DELETE FROM pais WHERE idpais = $1", [id]);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error en el DAO al eliminar pais:", error);
    throw error;
  }
};

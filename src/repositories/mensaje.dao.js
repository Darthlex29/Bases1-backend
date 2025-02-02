import pool from "../utils/dbConnect.js";

export const getAllMensajes = async () => {
  try {
    const result = await pool.query("SELECT * FROM MENSAJE");
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar mensajes:", error);
    throw error;
  }
};

export const getMensajeByIdAndUser = async (usuario, idMensaje) => {
  try {
    const result = await pool.query(
      "SELECT * FROM MENSAJE WHERE USUARIO = $1 AND IDMENSAJE = $2",
      [usuario, idMensaje]
    );
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar mensaje:", error);
    throw error;
  }
};

export const getMensajeById = async (idMensaje) => {
  try {
    const result = await pool.query(
      "SELECT * FROM MENSAJE WHERE IDMENSAJE = $1",
      [idMensaje]
    );
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar mensaje:", error);
    throw error;
  }
};

export const getSerialOfIdMensaje = async () => {
  try {
    const result = await pool.query(
      "SELECT MAX(CAST(SUBSTR(idmensaje, 2) AS INTEGER)) AS lastSerial FROM mensaje WHERE idmensaje LIKE 'M%'",
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error en el DAO al consultar mensaje:", error);
    throw error;
  }
};

export const getMensajesByUsuario = async (usuario) => {
  try {
    const result = await pool.query(
      "SELECT * FROM MENSAJE WHERE USUARIO = $1",
      [usuario]
    );
    return result.rows; // Devuelve todos los mensajes del usuario
  } catch (error) {
    console.error(
      "Error en el DAO al obtener los mensajes del usuario:",
      error
    );
    throw error;
  }
};

export const createMensaje = async ({
  USUARIO,
  IDMENSAJE,
  IDPAIS,
  MEN_USUARIO,
  MEN_IDMENSAJE,
  IDTIPOCARPETA,
  IDCATEGORIA,
  ASUNTO,
  CUERPOMENSAJE,
  FECHAACCION,
  HORAACCION,
}) => {
  try {
    const result = await pool.query(
      `INSERT INTO MENSAJE (
        USUARIO, IDMENSAJE, IDPAIS, MEN_USUARIO, MEN_IDMENSAJE, 
        IDTIPOCARPETA, IDCATEGORIA, ASUNTO, CUERPOMENSAJE, FECHAACCION, HORAACCION
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        USUARIO,
        IDMENSAJE,
        IDPAIS,
        MEN_USUARIO,
        MEN_IDMENSAJE,
        IDTIPOCARPETA,
        IDCATEGORIA,
        ASUNTO,
        CUERPOMENSAJE,
        FECHAACCION,
        HORAACCION,
      ]
    );
    return true;
  } catch (error) {
    console.error("Error en el DAO al insertar mensaje:", error);
    throw error;
  }
};

export const deleteMensaje = async (usuario, idMensaje) => {
  try {
    const result = await pool.query(
      "DELETE FROM MENSAJE WHERE USUARIO = $1 AND IDMENSAJE = $2",
      [usuario, idMensaje]
    );
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error en el DAO al eliminar mensaje:", error);
    throw error;
  }
};

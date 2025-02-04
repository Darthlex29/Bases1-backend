import pool from "../utils/dbConnect.js";

// Función para obtener todos los mensajes
export const getAllMensajes = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute("SELECT * FROM MENSAJE");
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar mensajes:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

// Función para obtener un mensaje por usuario e ID de mensaje
export const getMensajeByIdAndUser = async (usuario, idMensaje) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM MENSAJE WHERE USUARIO = :usuario AND IDMENSAJE = :idMensaje",
      { usuario, idMensaje }
    );
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar mensaje:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

// Función para obtener un mensaje por su ID
export const getMensajeById = async (idMensaje) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM MENSAJE WHERE IDMENSAJE = :idMensaje",
      { idMensaje }
    );
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar mensaje:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

// Función para obtener el último número de serie de un mensaje
export const getSerialOfIdMensaje = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT MAX(TO_NUMBER(SUBSTR(IDMENSAJE, 2))) AS lastSerial FROM MENSAJE WHERE IDMENSAJE LIKE 'M%'"
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error en el DAO al consultar mensaje:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

// Función para obtener todos los mensajes de un usuario específico
export const getMensajesByUsuario = async (usuario) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM MENSAJE WHERE USUARIO = :usuario",
      { usuario }
    );
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al obtener los mensajes del usuario:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

// Función para crear un nuevo mensaje en la base de datos
export const createMensaje = async (mensaje) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.execute(
      `INSERT INTO MENSAJE (
        USUARIO, IDMENSAJE, IDPAIS, MEN_USUARIO, MEN_IDMENSAJE, 
        IDTIPOCARPETA, IDCATEGORIA, ASUNTO, CUERPOMENSAJE, FECHAACCION, HORAACCION
      ) VALUES (:USUARIO, :IDMENSAJE, :IDPAIS, :MEN_USUARIO, :MEN_IDMENSAJE, :IDTIPOCARPETA, :IDCATEGORIA, :ASUNTO, :CUERPOMENSAJE, :FECHAACCION, :HORAACCION)`,
      mensaje,
      { autoCommit: true }
    );
    return true;
  } catch (error) {
    console.error("Error en el DAO al insertar mensaje:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

// Función para eliminar un mensaje de un usuario específico
export const deleteMensaje = async (usuario, idMensaje) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "DELETE FROM MENSAJE WHERE USUARIO = :usuario AND IDMENSAJE = :idMensaje",
      { usuario, idMensaje },
      { autoCommit: true }
    );
    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error en el DAO al eliminar mensaje:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

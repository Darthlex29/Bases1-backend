import pool from "../utils/dbConnect.js";
import oracledb from "oracledb";

export const getAllMensajes = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM MENSAJE",
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    return result.rows.map((mensaje) => {
      const mensajeLowerCase = {};
      for (let key in mensaje) {
        mensajeLowerCase[key.toLowerCase()] = mensaje[key];
      }
      return mensajeLowerCase;
    });
  } catch (error) {
    console.error("Error en el DAO al consultar mensajes:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

export const getMensajeByIdAndUser = async (usuario, idMensaje) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM MENSAJE WHERE USUARIO = :usuario AND IDMENSAJE = :idMensaje",
      { usuario, idMensaje },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (result.rows.length > 0) {
      const mensaje = result.rows[0];
      const mensajeLowerCase = {};
      for (let key in mensaje) {
        mensajeLowerCase[key.toLowerCase()] = mensaje[key];
      }
      return mensajeLowerCase;
    }
    return null;
  } catch (error) {
    console.error("Error en el DAO al consultar mensaje:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

export const getMensajeById = async (idMensaje) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM MENSAJE WHERE IDMENSAJE = :idMensaje",
      { idMensaje },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    
    if (result.rows.length > 0) {
      const mensaje = result.rows[0];
      const mensajeLowerCase = {};
      for (let key in mensaje) {
        mensajeLowerCase[key.toLowerCase()] = mensaje[key];
      }
      return mensajeLowerCase;
    }
    return null;
  } catch (error) {
    console.error("Error en el DAO al consultar mensaje:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

export const getSerialOfIdMensaje = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT MAX(TO_NUMBER(SUBSTR(IDMENSAJE, 2))) AS lastSerial FROM MENSAJE WHERE IDMENSAJE LIKE 'M%'",
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows[0]?.lastserial || null;
  } catch (error) {
    console.error("Error en el DAO al consultar el último número de serie:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

export const getMensajesByUsuario = async (usuario) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM MENSAJE WHERE USUARIO = :usuario",
      { usuario },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows.map((mensaje) => {
      const mensajeLowerCase = {};
      for (let key in mensaje) {
        mensajeLowerCase[key.toLowerCase()] = mensaje[key];
      }
      return mensajeLowerCase;
    });
  } catch (error) {
    console.error("Error en el DAO al obtener los mensajes del usuario:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

export const createMensaje = async (mensajeData) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.execute(
      `INSERT INTO MENSAJE (
        USUARIO, IDMENSAJE, IDPAIS, MEN_USUARIO, MEN_IDMENSAJE, 
        IDTIPOCARPETA, IDCATEGORIA, ASUNTO, CUERPOMENSAJE, FECHAACCION, HORAACCION
      ) VALUES (:usuario, :idmensaje, :idpais, :men_usuario, :men_idmensaje, 
        :idtipocarpeta, :idcategoria, :asunto, :cuerpomensaje, :fechaaccion, :horaaccion)`,
      mensajeData,
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

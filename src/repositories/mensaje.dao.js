import pool from "../utils/dbConnect.js";
import oracledb from "oracledb";

export const getAllMensajes = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute("SELECT * FROM MENSAJE", [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

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
      console.log({mensajeQueSeEncuentra:mensajeLowerCase});
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
      `SELECT MAX(TO_NUMBER(SUBSTR(IDMENSAJE, 2))) AS lastSerial
       FROM MENSAJE
       WHERE IDMENSAJE LIKE 'M%'
       AND REGEXP_LIKE(SUBSTR(IDMENSAJE, 2), '^[0-9]+$')`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows[0]?.LASTSERIAL || 0;
  } catch (error) {
    console.error(
      "Error en el DAO al consultar el último número de serie:",
      error
    );
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
    console.error(
      "Error en el DAO al obtener los mensajes del usuario:",
      error
    );
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

// Función para insertar el mensaje en la base de datos
export const createMensaje = async (
  usuario,
  idMensaje,
  idPais,
  menUsuario,
  menIdMensaje,
  idTipoCarpeta,
  idCategoria,
  asunto,
  cuerpoMensaje,
  fecha,
  hora
) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const sql = `
        INSERT INTO MENSAJE (
            USUARIO, IDMENSAJE, IDPAIS, MEN_USUARIO, MEN_IDMENSAJE,
            IDTIPOCARPETA, IDCATEGORIA, ASUNTO, CUERPOMENSAJE, FECHAACCION, HORAACCION
        ) VALUES (
            :usuario, :idMensaje, :idPais, :menUsuario, :menIdMensaje,
            :idTipoCarpeta, :idCategoria, :asunto, :cuerpoMensaje, 
            TO_DATE(:fecha, 'YYYY-MM-DD'), TO_DATE(:hora, 'HH24:MI:SS')
        )
    `;

    await connection.execute(
      sql,
      {
        usuario,
        idMensaje,
        idPais,
        menUsuario,
        menIdMensaje,
        idTipoCarpeta,
        idCategoria,
        asunto,
        cuerpoMensaje,
        fecha,
        hora,
      },
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

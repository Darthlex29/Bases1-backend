import pool from "../utils/dbConnect.js";
import oracledb from "oracledb";

// Función para obtener todos los destinatarios
export const getAllDestinatarios = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM DESTINATARIO",
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    
    return result.rows.map((dest) => {
      const destLowerCase = {};
      for (let key in dest) {
        destLowerCase[key.toLowerCase()] = dest[key];
      }
      return destLowerCase;
    });
  } catch (error) {
    console.error("Error en el DAO al consultar destinatarios:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Función para obtener un destinatario por su ID
export const getDestinatarioById = async (consecDestinatario) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM DESTINATARIO WHERE CONSECDESTINATARIO = :consecDestinatario",
      [consecDestinatario],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    
    return result.rows[0] ? Object.fromEntries(
      Object.entries(result.rows[0]).map(([key, val]) => [key.toLowerCase(), val])
    ) : null;
  } catch (error) {
    console.error("Error en el DAO al consultar destinatario por ID:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Función para obtener destinatarios por ID de mensaje
export const getDestinatarioByMensaje = async (idMensaje) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM DESTINATARIO WHERE IDMENSAJE LIKE :idMensaje",
      [idMensaje],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    
    return result.rows.map((dest) => {
      const destLowerCase = {};
      for (let key in dest) {
        destLowerCase[key.toLowerCase()] = dest[key];
      }
      return destLowerCase;
    });
  } catch (error) {
    console.error("Error en el DAO al consultar destinatarios por ID de mensaje:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Función para obtener destinatarios por usuario
export const getDestinatarioByUser = async (usuario) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM DESTINATARIO WHERE USUARIO LIKE :usuario",
      [usuario],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    
    return result.rows.map((dest) => {
      const destLowerCase = {};
      for (let key in dest) {
        destLowerCase[key.toLowerCase()] = dest[key];
      }
      console.log(destLowerCase)
      return destLowerCase;
    });
  } catch (error) {
    console.error("Error en el DAO al consultar destinatarios por usuario:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Función para obtener destinatarios asociados a un usuario y un consecutivo
export const getDestinatariosInEmail = async (usuario, consecDestinatario) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM DESTINATARIO WHERE USUARIO LIKE :usuario AND CONSECDESTINATARIO LIKE :consecDestinatario",
      [usuario, consecDestinatario],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    
    return result.rows.map((dest) => {
      const destLowerCase = {};
      for (let key in dest) {
        destLowerCase[key.toLowerCase()] = dest[key];
      }
      return destLowerCase;
    });
  } catch (error) {
    console.error("Error en el DAO al consultar destinatarios en email:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Función para obtener el último consecutivo de destinatario
export const getUltimoConsecDestinatario = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT COALESCE(MAX(CONSECDESTINATARIO), 0) + 1 AS NUEVOCONSEC FROM DESTINATARIO",
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows[0]?.NUEVOCONSEC || 1;
  } catch (error) {
    console.error("Error en el DAO al obtener el último CONSECDESTINATARIO:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Función para insertar un nuevo destinatario en la base de datos
export const insertarDestinatario = async (
  consecDestinatario,
  tipoCopia,
  consecContacto,
  usuario,
  idMensaje,
  idPais
) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.execute(
      `INSERT INTO DESTINATARIO (CONSECDESTINATARIO, IDTIPOCOPIA, CONSECCONTACTO, USUARIO, IDMENSAJE, IDPAIS) VALUES (:consecDestinatario, :tipoCopia, :consecContacto, :usuario, :idMensaje, :idPais)`,
      { consecDestinatario, tipoCopia, consecContacto, usuario, idMensaje, idPais },
      { autoCommit: true }
    );
    return true;
  } catch (error) {
    console.error("Error en el DAO al insertar destinatario:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

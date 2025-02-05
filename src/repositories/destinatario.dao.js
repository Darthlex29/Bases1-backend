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

// Función para obtener destinatarios por usuario
export const getMensajesRecibidos = async (usuario) => {
  let connection;
  try {
    connection = await pool.getConnection();
    
    const query = `
      SELECT 
          M.USUARIO AS REMITENTE_ID,
          U.NOMBRE AS REMITENTE_NOMBRE,
          U.APELLIDO AS REMITENTE_APELLIDO,
          M.IDMENSAJE AS MENSAJE_ID,
          M.ASUNTO AS ASUNTO,
          M.CUERPOMENSAJE AS CUERPO,
          M.FECHAACCION AS FECHA_ENVIO,
          M.HORAACCION AS HORA_ENVIO,
          C.CORREOCONTACTO AS CORREO_DESTINATARIO,
          C.NOMBRECONTACTO AS NOMBRE_DESTINATARIO
      FROM 
          DESTINATARIO D
      JOIN 
          CONTACTO C ON D.CONSECCONTACTO = C.CONSECCONTACTO
      JOIN 
          MENSAJE M ON D.USUARIO = M.USUARIO AND D.IDMENSAJE = M.IDMENSAJE
      JOIN 
          USUARIO U ON M.USUARIO = U.USUARIO
      WHERE 
          C.USU_USUARIO IS NOT NULL 
          AND C.USU_USUARIO = :usuario
    `;

    const result = await connection.execute(query, { usuario }, { outFormat: oracledb.OUT_FORMAT_OBJECT });

    return result.rows.map((mensaje) => {
      const mensajeLowerCase = {};
      for (let key in mensaje) {
        mensajeLowerCase[key.toLowerCase()] = mensaje[key];
      }
      return mensajeLowerCase;
    });
  } catch (error) {
    console.error("Error en el DAO al consultar los mensajes recibidos:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Función para obtener mensajes recibidos por tipo de copia
export const getMensajesRecibidosPorTipoCopia = async (usuario, tipoCopia) => {
  let connection;
  try {
    connection = await pool.getConnection();

    const query = `
      SELECT 
          M.USUARIO AS REMITENTE_ID,
          U.NOMBRE AS REMITENTE_NOMBRE,
          U.APELLIDO AS REMITENTE_APELLIDO,
          M.IDMENSAJE AS MENSAJE_ID,
          M.ASUNTO AS ASUNTO,
          M.CUERPOMENSAJE AS CUERPO,
          M.FECHAACCION AS FECHA_ENVIO,
          M.HORAACCION AS HORA_ENVIO,
          C.CORREOCONTACTO AS CORREO_DESTINATARIO,
          C.NOMBRECONTACTO AS NOMBRE_DESTINATARIO,
          TC.DESCTIPOCOPIA AS TIPO_COPIA
      FROM 
          DESTINATARIO D
      JOIN 
          CONTACTO C ON D.CONSECCONTACTO = C.CONSECCONTACTO
      JOIN 
          MENSAJE M ON D.USUARIO = M.USUARIO AND D.IDMENSAJE = M.IDMENSAJE
      JOIN 
          USUARIO U ON M.USUARIO = U.USUARIO
      JOIN 
          TIPOCOPIA TC ON D.IDTIPOCOPIA = TC.IDTIPOCOPIA
      WHERE 
          C.USU_USUARIO IS NOT NULL 
          AND C.USU_USUARIO = :usuario
          AND TC.IDTIPOCOPIA = :tipoCopia
    `;

    const result = await connection.execute(
      query,
      { usuario, tipoCopia },
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
    console.error("Error en el DAO al consultar los mensajes recibidos por tipo de copia:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Función para obtener mensajes recibidos por país
export const getMensajesRecibidosPorPais = async (usuario, idPais) => {
  let connection;
  try {
    connection = await pool.getConnection();

    const query = `
      SELECT 
          M.USUARIO AS REMITENTE_ID,
          U.NOMBRE AS REMITENTE_NOMBRE,
          U.APELLIDO AS REMITENTE_APELLIDO,
          M.IDMENSAJE AS MENSAJE_ID,
          M.ASUNTO AS ASUNTO,
          M.CUERPOMENSAJE AS CUERPO,
          M.FECHAACCION AS FECHA_ENVIO,
          M.HORAACCION AS HORA_ENVIO,
          C.CORREOCONTACTO AS CORREO_DESTINATARIO,
          C.NOMBRECONTACTO AS NOMBRE_DESTINATARIO,
          P.NOMPAIS AS PAIS_REMITENTE
      FROM 
          DESTINATARIO D
      JOIN 
          CONTACTO C ON D.CONSECCONTACTO = C.CONSECCONTACTO
      JOIN 
          MENSAJE M ON D.USUARIO = M.USUARIO AND D.IDMENSAJE = M.IDMENSAJE
      JOIN 
          USUARIO U ON M.USUARIO = U.USUARIO
      JOIN 
          PAIS P ON M.IDPAIS = P.IDPAIS
      WHERE 
          C.USU_USUARIO IS NOT NULL 
          AND C.USU_USUARIO = :usuario
          AND P.IDPAIS = :idPais
    `;

    const result = await connection.execute(
      query,
      { usuario, idPais },
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
    console.error("Error en el DAO al consultar los mensajes recibidos por país:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Función para obtener mensajes recibidos por contacto
export const getMensajesRecibidosPorContacto = async (usuario, consecContacto) => {
  let connection;
  try {
    connection = await pool.getConnection();

    const query = `
      SELECT 
          M.USUARIO AS REMITENTE_ID,
          U.NOMBRE AS REMITENTE_NOMBRE,
          U.APELLIDO AS REMITENTE_APELLIDO,
          M.IDMENSAJE AS MENSAJE_ID,
          M.ASUNTO AS ASUNTO,
          M.CUERPOMENSAJE AS CUERPO,
          M.FECHAACCION AS FECHA_ENVIO,
          M.HORAACCION AS HORA_ENVIO,
          C.CORREOCONTACTO AS CORREO_DESTINATARIO,
          C.NOMBRECONTACTO AS NOMBRE_DESTINATARIO
      FROM 
          DESTINATARIO D
      JOIN 
          CONTACTO C ON D.CONSECCONTACTO = C.CONSECCONTACTO
      JOIN 
          MENSAJE M ON D.USUARIO = M.USUARIO AND D.IDMENSAJE = M.IDMENSAJE
      JOIN 
          USUARIO U ON M.USUARIO = U.USUARIO
      WHERE 
          C.USU_USUARIO IS NOT NULL 
          AND C.USU_USUARIO = :usuario
          AND C.CONSECCONTACTO = :consecContacto
    `;

    const result = await connection.execute(
      query,
      { usuario, consecContacto },
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
    console.error("Error en el DAO al consultar los mensajes recibidos por contacto:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

// Función para obtener mensajes recibidos por múltiples criterios
export const getMensajesRecibidosFiltrados = async (usuario, tipoCopia, idPais, consecContacto) => {
  let connection;
  try {
    connection = await pool.getConnection();

    const query = `
      SELECT 
          M.USUARIO AS REMITENTE_ID,
          U.NOMBRE AS REMITENTE_NOMBRE,
          U.APELLIDO AS REMITENTE_APELLIDO,
          M.IDMENSAJE AS MENSAJE_ID,
          M.ASUNTO AS ASUNTO,
          M.CUERPOMENSAJE AS CUERPO,
          M.FECHAACCION AS FECHA_ENVIO,
          M.HORAACCION AS HORA_ENVIO,
          C.CORREOCONTACTO AS CORREO_DESTINATARIO,
          C.NOMBRECONTACTO AS NOMBRE_DESTINATARIO,
          TC.DESCTIPOCOPIA AS TIPO_COPIA,
          P.NOMPAIS AS PAIS_REMITENTE
      FROM 
          DESTINATARIO D
      JOIN 
          CONTACTO C ON D.CONSECCONTACTO = C.CONSECCONTACTO
      JOIN 
          MENSAJE M ON D.USUARIO = M.USUARIO AND D.IDMENSAJE = M.IDMENSAJE
      JOIN 
          USUARIO U ON M.USUARIO = U.USUARIO
      JOIN 
          TIPOCOPIA TC ON D.IDTIPOCOPIA = TC.IDTIPOCOPIA
      JOIN 
          PAIS P ON M.IDPAIS = P.IDPAIS
      WHERE 
          C.USU_USUARIO IS NOT NULL 
          AND C.USU_USUARIO = :usuario
          AND (:tipoCopia IS NULL OR TC.IDTIPOCOPIA = :tipoCopia)
          AND (:idPais IS NULL OR P.IDPAIS = :idPais)
          AND (:consecContacto IS NULL OR C.CONSECCONTACTO = :consecContacto)
    `;

    const result = await connection.execute(
      query,
      { usuario, tipoCopia, idPais, consecContacto },
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
    console.error("Error en el DAO al consultar los mensajes recibidos filtrados:", error);
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
      `INSERT INTO DESTINATARIO (CONSECDESTINATARIO, IDTIPOCOPIA, CONSECCONTACTO, USUARIO, IDMENSAJE, IDPAIS) 
       VALUES (:1, :2, :3, :4, :5, :6)`,
      [consecDestinatario, tipoCopia, consecContacto, usuario, idMensaje, idPais], // Usar un array de valores
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

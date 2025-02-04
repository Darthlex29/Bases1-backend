import pool from "../utils/dbConnect.js";

// Función para obtener todos los destinatarios
export const getAllDestinatarios = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute("SELECT * FROM DESTINATARIO");
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar destinatarios:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

// Función para obtener un destinatario por su ID
export const getDestinatarioById = async (consecDestinatario) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM DESTINATARIO WHERE CONSECDESTINATARIO = :consecDestinatario",
      { consecDestinatario }
    );
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar destinatario:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

// Función para obtener destinatarios por ID de mensaje
export const getDestinatarioByMensaje = async (idMensaje) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM DESTINATARIO WHERE IDMENSAJE = :idMensaje",
      { idMensaje }
    );
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar destinatarios por mensaje:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

// Función para obtener destinatarios por usuario
export const getDestinatarioByUser = async (usuario) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM DESTINATARIO WHERE USUARIO = :usuario",
      { usuario }
    );
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar destinatarios por usuario:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

// Función para obtener los destinatarios asociados a un usuario y un ID específico
export const getDestinatariosInEmail = async (usuario, consecDestinatario) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT * FROM DESTINATARIO WHERE USUARIO = :usuario AND CONSECDESTINATARIO = :consecDestinatario",
      { usuario, consecDestinatario }
    );
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar destinatarios en email:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

// Función para obtener el último consecutivo de destinatario
export const getUltimoConsecDestinatario = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.execute(
      "SELECT COALESCE(MAX(CONSECDESTINATARIO), 0) + 1 AS NUEVOCONSEC FROM DESTINATARIO"
    );

    const nuevoConsec = result.rows.length > 0 ? result.rows[0].NUEVOCONSEC : 1;
    console.log("Nuevo consecutivo:", nuevoConsec);
    
    return nuevoConsec;
  } catch (error) {
    console.error("Error en el DAO al obtener el último CONSECDESTINATARIO:", error);
    throw new Error("Error al obtener el último consecutivo de destinatario: " + error.message);
  } finally {
    if (connection) await connection.close();
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

    const query = `
      INSERT INTO DESTINATARIO (CONSECDESTINATARIO, IDTIPOCOPIA, CONSECCONTACTO, USUARIO, IDMENSAJE, IDPAIS) 
      VALUES (:consecDestinatario, :tipoCopia, :consecContacto, :usuario, :idMensaje, :idPais)
    `;

    const binds = {
      consecDestinatario,
      tipoCopia,
      consecContacto,
      usuario,
      idMensaje,
      idPais,
    };

    const options = { autoCommit: true };
    await connection.execute(query, binds, options);

    return true;
  } catch (error) {
    console.error("Error en el DAO al insertar destinatario:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

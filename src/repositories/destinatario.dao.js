import pool from "../utils/dbConnect.js";

// Función para obtener todos los destinatarios
export const getAllDestinatarios = async () => {
  try {
    const result = await pool.query("SELECT * FROM DESTINATARIO");
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar destinatarios:", error);
    throw error;
  }
};

// Función para obtener un destinatario por su ID
export const getDestinatarioById = async (consecDestinatario) => {
  try {
    const result = await pool.query(
      "SELECT * FROM DESTINATARIO WHERE CONSECDESTINATARIO = $1 ",
      [consecDestinatario]
    );
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar mensaje:", error);
    throw error;
  }
};

// Función para obtener destinatarios por ID de mensaje
export const getDestinatarioByMensaje = async (idMensaje) => {
  try {
    const result = await pool.query(
      "SELECT * FROM DESTINATARIO WHERE idmensaje like $1 ",
      [idMensaje]
    );
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar mensaje:", error);
    throw error;
  }
};

// Función para obtener destinatarios por usuario
export const getDestinatarioByUser = async (usuario) => {
  try {
    const result = await pool.query(
      "SELECT * FROM DESTINATARIO WHERE USUARIO like $1 ",
      [usuario]
    );
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar mensaje:", error);
    throw error;
  }
};

// Función para obtener del usuario los destinatarios asociados 
export const getDestinatariosInEmail = async (usuario, consecDestinatario) => {
  try {
    const result = await pool.query(
      "SELECT * FROM DESTINATARIO WHERE USUARIO like $1 AND CONSECDESTINATARIO Like S2",
      [usuario, consecDestinatario]
    );
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar mensaje:", error);
    throw error;
  }
};

// Función para obtener el último consecutivo de destinatario
export const getUltimoConsecDestinatario = async () => {
  try {
    const result = await pool.query(
      "SELECT COALESCE(MAX(CONSECDESTINATARIO), 0) + 1 AS nuevoconsec FROM DESTINATARIO"
    );

    console.log(result.rows[0]); // Inspeccionar la primera fila

    const nuevoConsec = result.rows[0] ? result.rows[0].nuevoconsec : 1;

    console.log("Aquí está el número: " + nuevoConsec);

    return nuevoConsec;
  } catch (error) {
    console.error("Error en el DAO al obtener el último CONSECDESTINATARIO:", error.message);
    throw new Error("Error al obtener el último consecutivo de destinatario: " + error.message);
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
  try {
    const query = `
        INSERT INTO DESTINATARIO (CONSECDESTINATARIO, IDTIPOCOPIA, CONSECCONTACTO, USUARIO, IDMENSAJE, IDPAIS) 
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
    await pool.query(query, [
      consecDestinatario,
      tipoCopia,
      consecContacto,
      usuario,
      idMensaje,
      idPais,
    ]);
    return true;
  } catch (error) {
    console.error("Error en el DAO al insertar destinatario:", error);
    throw error;
  }
};

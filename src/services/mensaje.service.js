import {
  createMensaje,
  getMensajeById,
  getSerialOfIdMensaje,
} from "../repositories/mensaje.dao.js";
import { getCountryByDomain } from "../services/pais.service.js";
import { DateTime } from "luxon";

// Función para manejar la creación de un nuevo mensaje
export const handleCreateMensaje = async (req, res, currentUser) => {
  try {
    const mensaje = req.body;
    const usuario = currentUser.id;

    // Obtener país desde el dominio del correo del usuario actual
    const pais = await getCountryByDomain(currentUser.email);
    if (!pais) {
      throw new Error("No se pudo determinar el país");
    }

    // Extraer datos del mensaje desde el cuerpo de la petición
    const asunto = mensaje.asunto;
    const cuerpo = mensaje.cuerpoMensaje;
    // Asegurar formato correcto para Oracle
    const fecha = DateTime.now()
      .setZone("America/Bogota")
      .toFormat("yyyy-MM-dd"); // YYYY-MM-DD
    const hora = DateTime.now().setZone("America/Bogota").toFormat("HH:mm:ss"); // HH:MM:SS

    const idTipoCarpeta = mensaje.idTipoCarpeta;
    const idCategoria = mensaje.idCategoria;
    const menUsuario = mensaje.menUsuario || null;
    const menIdMensaje = mensaje.menIdMensaje || null;

    // Generar un ID único para el mensaje
    const idMensaje = await generateSerialCode();

    console.log("Datos del mensaje a insertar:", {
      usuario,
      idMensaje,
      idPais: pais.idpais,
      menUsuario,
      menIdMensaje,
      idTipoCarpeta,
      idCategoria,
      asunto,
      cuerpo,
      fecha,
      hora,
    });

    // Insertar mensaje en la base de datos
    const mensajeCreado = await createMensaje(
      usuario,
      idMensaje,
      pais.idpais,
      menUsuario,
      menIdMensaje,
      idTipoCarpeta,
      idCategoria,
      asunto,
      cuerpo,
      fecha,
      hora
    );

    if (mensajeCreado) {
      return {
        status: "201",
        message: "Mensaje creado con éxito",
        idMensaje: idMensaje,
      };
    } else {
      throw new Error("Error al crear mensaje en la base de datos");
    }
  } catch (error) {
    console.error("Error al crear mensaje:", error);
    throw error; // Lanza el error para que el controlador lo maneje
  }
};

const generateSerialCode = async () => {
  let serialCode;

  // Consulta compatible con Oracle y PostgreSQL
  const result = await getSerialOfIdMensaje();

  // Obtener el último número serial y convertirlo a entero
  let lastSerial;
  console.log({ RESULT: result });
  lastSerial = result;

  // Incrementar el último número serial en 1
  const newSerial = lastSerial + 1;

  // Formatear el nuevo código con el prefijo "M" y un número de 4 dígitos
  serialCode = `M${newSerial.toString().padStart(4, "0")}`;

  return serialCode;
};

// Función para responder un mensaje existente
export const responderMensaje = async (idMensajeOriginal, cuerpoMensaje, currentUser) => {
  try {
    const usuario = currentUser.id;

    // Obtener información del mensaje original
    const mensajesAnteriores = await getMensajeById(idMensajeOriginal);
    if (!mensajesAnteriores) {
      throw new Error({ message: "Mensaje original no encontrado" });
    }
    const mensajeAnterior = mensajesAnteriores;

    // Obtener país desde el dominio del correo del usuario actual
    const pais = await getCountryByDomain(currentUser.email);
    if (!pais) {
      throw new Error("No se pudo determinar el país");
    }

    // Extraer información del mensaje original
    const asunto = mensajeAnterior.asunto;
    const fecha = DateTime.now()
      .setZone("America/Bogota")
      .toFormat("yyyy-MM-dd");
    const hora = DateTime.now().setZone("America/Bogota").toFormat("HH:mm:ss");

    // Generar un nuevo ID para el mensaje de respuesta
    const idMensaje = await generateSerialCode();

    console.log("Datos del mensaje de respuesta:", {
      usuario,
      idMensaje,
      idPais: pais.idpais,
      idMensajeOriginal,
      idTipoCarpeta: mensajeAnterior.idtipocarpeta,
      idCategoria: mensajeAnterior.idcategoria,
      asunto,
      cuerpoMensaje,
      fecha,
      hora,
    });

    // Insertar el mensaje de respuesta en la base de datos
    const mensajeCreado = await createMensaje(
      usuario,
      idMensaje,
      pais.idpais,
      mensajeAnterior.usuario, // Se mantiene la referencia al usuario del mensaje original
      idMensajeOriginal,
      mensajeAnterior.idtipocarpeta,
      mensajeAnterior.idcategoria,
      asunto,
      cuerpoMensaje,
      fecha,
      hora
    );

    if (mensajeCreado) {
      return {
        status: "201",
        message: "Mensaje de respuesta enviado",
        idMensaje,
      };
    } else {
      throw new Error("Error al registrar la respuesta en la base de datos");
    }
  } catch (error) {
    console.error("Error al responder mensaje:", error);
    throw error; // Lanza el error para que el controlador lo maneje
  }
};

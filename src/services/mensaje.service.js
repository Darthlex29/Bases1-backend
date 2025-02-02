import {
  createMensaje,
  getMensajeById,
  getSerialOfIdMensaje,
} from "../repositories/mensaje.dao.js";
import { getCountryByDomain } from "../services/pais.service.js";
import { DateTime } from "luxon";

export const handleCreateMensaje = async (req, res, currentUser) => {
  try {
    const mensaje = req.body;
    const usuario = currentUser.id;

    // Obtener país desde el dominio del correo
    const pais = await getCountryByDomain(currentUser.email);
    if (!pais) {
      return res.status(400).json({ message: "No se pudo determinar el país" });
    }

    // Obtener datos del mensaje
    const asunto = mensaje.asunto;
    const cuerpo = mensaje.cuerpoMensaje;
    const fecha = new Date().toISOString().split("T")[0];
    const hora = DateTime.now().setZone("America/Bogota").toFormat("HH:mm:ss");

    const idTipoCarpeta = mensaje.idTipoCarpeta;
    const idCategoria = mensaje.idCategoria;
    const menUsuario = mensaje.menUsuario || null;
    const menIdMensaje = mensaje.menIdMensaje || null;

    // Generar ID del mensaje
    const idMensaje = await generateSerialCode();

    // Datos para la inserción en la BD
    const mensajeData = {
      USUARIO: usuario,
      IDMENSAJE: idMensaje,
      IDPAIS: pais.idpais,
      MEN_USUARIO: menUsuario,
      MEN_IDMENSAJE: menIdMensaje,
      IDTIPOCARPETA: idTipoCarpeta,
      IDCATEGORIA: idCategoria,
      ASUNTO: asunto,
      CUERPOMENSAJE: cuerpo,
      FECHAACCION: fecha,
      HORAACCION: hora,
    };

    console.log("Datos del mensaje a insertar:", mensajeData);

    // Insertar mensaje en la base de datos
    const mensajeCreado = await createMensaje(mensajeData);

    if (mensajeCreado) {
      const stateMensaje = {
        status: "201",
        message: "Mensaje creado con éxito",
        idMensaje: idMensaje
      };
      return stateMensaje;
    } else {
      return res
        .status(500)
        .json({ message: "Error al crear mensaje en la base de datos" });
    }
  } catch (error) {
    console.error("Error al crear mensaje:", error);
    res.status(500).json({ message: "Error al crear mensaje", error });
  }
};

const generateSerialCode = async () => {
  let serialCode;

  // Consulta compatible con Oracle y PostgreSQL
  const result = await getSerialOfIdMensaje();

  // Obtener el último número serial y convertirlo a entero
  console.log(result.lastserial);
  const lastSerial = result.lastserial;

  // Incrementar el último número serial en 1
  const newSerial = lastSerial + 1;

  // Formatear el nuevo código con el prefijo "M" y un número de 4 dígitos
  serialCode = `M${newSerial.toString().padStart(4, "0")}`;

  return serialCode;
};

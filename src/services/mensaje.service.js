import { createMensaje, getMensajeById } from "../repositories/mensaje.dao.js";
import { getCountryByDomain } from "../services/pais.service.js";
import { DateTime } from "luxon";

export const handleCreateMensaje = async (req, res, currentUser) => {
  try {
    //const mensaje = await createMensaje(req.body);
    const mensaje = req.body;
    const usuario = currentUser.id;

    const pais = await getCountryByDomain(currentUser.email);
    const asunto = mensaje.asunto;
    const cuerpo = mensaje.cuerpoMensaje;
    const fecha = new Date().toISOString().split("T")[0];
    const hora = DateTime.now().setZone("America/Bogota").toFormat("HH:mm:ss");

    const idTipoCarpeta = mensaje.idTipoCarpeta;
    const idCategoria = mensaje.idCategoria;
    const menUsuario = mensaje.menUsuario || null;
    const menIdMensaje = mensaje.menIdMensaje || null;
    const idMensaje = await generarIdMensaje(usuario, fecha, hora);

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

    const correctMensaje = await createMensaje(mensajeData);
    if (correctMensaje) {
      res.status(201).json({message: "Mensaje creado con exito"});
    } else {
      res.status(500).json(correctMensaje);
    }
  } catch (error) {
    console.error("Error al crear mensaje:", error);
    res.status(500).json({ message: "Error al crear mensaje", error });
  }
};

const generarIdMensaje = async (usuario, fecha, hora) => {
  let idMensaje;
  let existe;

  do {
    // Tomar las primeras 2 letras del usuario (asegurarse de que estén en mayúsculas)
    const usuarioPart = usuario.substring(3, 5).toUpperCase();

    // Tomar los últimos 2 dígitos del año y el mes de la fecha (por ejemplo, "23" y "09" para 2023-09-15)
    const fechaPart = fecha.substring(2, 4) + fecha.substring(5, 7);

    // Tomar los últimos 2 dígitos de la hora (por ejemplo, "45" para 14:23:45)
    const horaPart = hora.substring(6, 8);

    // Combinar las partes y truncar a 5 dígitos
    idMensaje = (usuarioPart + fechaPart + horaPart).substring(0, 5);

    // Verificar si el IDMENSAJE ya existe para el usuario
    const result = getMensajeById(idMensaje);
    existe = result.rows > 0;
  } while (existe); // Repetir si el IDMENSAJE ya existe

  return idMensaje;
};

import { agregarDestinatarioDAO } from "../dao/destinatario.dao.js";

export const crearDestinatarioController = async (req, res) => {
  try {
    const { idTipoCopia, consecContacto, usuario, idMensaje, idPais } =
      req.body;

    if (!idTipoCopia || !consecContacto || !usuario || !idMensaje || !idPais) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const destinatario = await agregarDestinatarioDAO(
      idTipoCopia,
      consecContacto,
      usuario,
      idMensaje,
      idPais
    );

    res
      .status(201)
      .json({ message: "Destinatario creado con éxito", destinatario });
  } catch (error) {
    console.error("Error al crear destinatario:", error);
    res.status(500).json({ message: "Error al crear destinatario", error });
  }
};

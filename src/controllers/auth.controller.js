import { getUserByEmail } from "../repositories/user.dao.js";


export const login = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Faltan datos." });
    }

    const { correoalterno } = req.body;
    const user = await getUserByEmail(correoalterno);
    console.log(user)
    if (user) {
      console.log({ id: user.usuario, email: user.correoalterno }); // Acceso a las propiedades del objeto

      req.session.user = {
        id: user.usuario,
        email: user.correoalterno,
      };
      res.status(200).json({ message: "Sesión iniciada", user: req.session.user });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al consultar usuarios:", error);
    res.status(500).json({ message: "Error al consultar usuarios", error });
  }
};


export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error al cerrar sesión" });
    }
  });
  res.status(200).json({ message: "Sesión cerrada" });
};

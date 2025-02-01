import { getAllUsers, getUserByEmail } from "../repositories/user.dao.js";

export const findAll = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al consultar usuarios:", error);
    res.status(500).json({ message: "Error al consultar usuarios", error });
  }
};

export const createUser = (req, res) => {
  res.status(204).json({ message: "Por implementar en futuros desarrollos" });
};

export const updateUser = (req, res) => {
  res.status(204).json({ message: "Por implementar en futuros desarrollos" });
};

export const deleteUser = (req, res) => {
  res.status(204).json({ message: "Por implementar en futuros desarrollos" });
};

export const findUserByEmail = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Faltan datos." });
    }

    const { email } = req.body;
    const user = await getUserByEmail(email);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al consultar usuarios:", error);
    res.status(500).json({ message: "Error al consultar usuarios", error });
  }
};

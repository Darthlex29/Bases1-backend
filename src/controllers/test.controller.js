/*
import sequelize from "../utils/dbConexion.js"; // Asegúrate de que la ruta esté correcta

export const testConnection = async (req, res) => {
  try {
    // Realizamos una consulta simple
    const [results] = await sequelize.query("SELECT NOW() AS now");
    res.status(200).json({
      message: "Conexión a la base de datos exitosa",
      now: results[0].now,
    });
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    res
      .status(500)
      .json({ message: "Error al conectar a la base de datos", error });
  }
};

*/
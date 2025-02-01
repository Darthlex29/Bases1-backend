/*
import { Sequelize } from "sequelize";
import config from "../config/config.json" assert { type: "json" };

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

// Crear instancia de Sequelize
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
  }
);

// Función para verificar la conexión
const verificarConexion = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos exitosa.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
};

// Llamar a la función para verificar la conexión
verificarConexion();

// Exportar la instancia de Sequelize
export default sequelize;

*/
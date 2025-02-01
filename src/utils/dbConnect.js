import pkg from "pg";
import config from "../config/config.json" assert { type: "json" };

const { Pool } = pkg;
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const pool = new Pool({
  user: dbConfig.user,  // Debe ser "user", no "username"
  password: dbConfig.password,
  database: dbConfig.database,
  host: dbConfig.host,
  port: dbConfig.port
});

const verificarConexion = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Conexión a PostgreSQL exitosa.");
    client.release();
  } catch (error) {
    console.error("❌ Error al conectar a PostgreSQL:", error);
  }
};

verificarConexion();

export default pool;

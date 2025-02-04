import oracledb from "oracledb";
import fs from "fs";

const env = process.env.NODE_ENV || "development";
const config = JSON.parse(fs.readFileSync("./src/config/config.json", "utf-8"));
const dbConfig = config[env];

const pool = await oracledb.createPool({
  user: dbConfig.user,
  password: dbConfig.password,
  connectString: dbConfig.connectString
});

const verificarConexion = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Conexión a Oracle exitosa.");
    connection.close();
  } catch (error) {
    console.error("❌ Error al conectar a Oracle:", error);
  }
};

verificarConexion();

export default pool;

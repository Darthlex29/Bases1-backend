import pool from "../utils/dbConnect.js";

export const getAllUsers = async () => {
  try {
    const result = await pool.query("SELECT * FROM usuario");
    return result.rows;
  } catch (error) {
    console.error("Error en el DAO al consultar usuarios:", error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM usuario WHERE correoalterno like $1", [
      email,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error en el DAO al consultar usuarios:", error);
    throw error;
  }
};





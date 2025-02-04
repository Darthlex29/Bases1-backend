import pool from "../utils/dbConnect.js";

export const getEstadoById = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM ESTADO WHERE idEstado = $1", [
        id,
        ]);
        return result.rows[0];
    } catch (error) {
        console.error("Error en el DAO al consultar estado:", error);
        throw error;
    }
};

export const getAllEstados = async () => {
    try {
        const result = await pool.query("SELECT * FROM ESTADO");
        return result.rows;
    } catch (error) {
        console.error("Error en el DAO al consultar estados:", error);
        throw error;
    }
};
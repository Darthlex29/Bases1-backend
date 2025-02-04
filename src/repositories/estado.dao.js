import pool from "../utils/dbConnect.js";

export const getEstadoById = async (id) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const result = await connection.execute(
            "SELECT * FROM ESTADO WHERE idEstado = :id",
            [id],
            { outFormat: pool.OUT_FORMAT_OBJECT }
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error en el DAO al consultar estado:", error);
        throw error;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (closeError) {
                console.error("Error cerrando la conexión:", closeError);
            }
        }
    }
};

export const getAllEstados = async () => {
    let connection;
    try {
        connection = await pool.getConnection();
        const result = await connection.execute(
            "SELECT * FROM ESTADO",
            [],
            { outFormat: pool.OUT_FORMAT_OBJECT }
        );
        return result.rows;
    } catch (error) {
        console.error("Error en el DAO al consultar estados:", error);
        throw error;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (closeError) {
                console.error("Error cerrando la conexión:", closeError);
            }
        }
    }
};
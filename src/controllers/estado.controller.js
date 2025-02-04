import{
    getEstadoById,
    getAllEstados
} from "../repositories/estado.dao.js";

export const findEstadoById = async (req, res) => {
    try {
        const id = req.params.id;
        const estado = await getEstadoById(id);
        if (estado) {
            res.status(200).json(estado);
        } else {
            res.status(404).json({ message: "Estado no encontrado" });
        }
    } catch (error) {
        console.error("Error al consultar estado:", error);
        res.status(500).json({ message: "Error al consultar estado", error });
    }
};

export const findAll = async (req, res) => {
    try {
        const estados = await getAllEstados();
        res.status(200).json(estados);
    } catch (error) {
        console.error("Error al consultar estados:", error);
        res.status(500).json({ message: "Error al consultar estados", error });
    }
};


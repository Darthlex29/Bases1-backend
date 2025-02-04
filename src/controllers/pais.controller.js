import {
    getAllPaises,
    getPaisById,
    getPaisByDominio,
    createPais,
    updatePais,
    deletePais,
  } from "../repositories/pais.dao.js";
  
  export const findAllPaises = async (req, res) => {
    try {
      const paises = await getAllPaises();
      res.status(200).json(paises);
    } catch (error) {
      console.error("Error al obtener países:", error);
      res.status(500).json({ message: "Error al obtener países", error });
    }
  };
  
  export const findPaisById = async (req, res) => {
    try {
      const { idPais } = req.body;
      console.log({idPais:idPais, body:req.body})
      const pais = await getPaisById(idPais);
      if (pais) {
        res.status(200).json(pais);
      } else {
        res.status(404).json({ message: "País no encontrado" });
      }
    } catch (error) {
      console.error("Error al obtener país:", error);
      res.status(500).json({ message: "Error al obtener país", error });
    }
  };
  
  export const findPaisByDominio = async (req, res) => {
    try {
      const { dominio } = req.params;
      const pais = await getPaisByDominio(dominio);
      if (pais) {
        res.status(200).json(pais);
      } else {
        res.status(404).json({ message: "País no encontrado" });
      }
    } catch (error) {
      console.error("Error al obtener país por dominio:", error);
      res.status(500).json({ message: "Error al obtener país", error });
    }
  };
  
  export const createNewPais = async (req, res) => {
    try {
      const { idPais, nomPais, dominio } = req.body;
      if (!idPais || !nomPais || !dominio) {
        return res.status(400).json({ message: "Faltan datos requeridos" });
      }
      await createPais({ idPais, nomPais, dominio });
      res.status(201).json({ message: "País creado exitosamente" });
    } catch (error) {
      console.error("Error al crear país:", error);
      res.status(500).json({ message: "Error al crear país", error });
    }
  };
  
  export const updateExistingPais = async (req, res) => {
    try {
      const { idPais } = req.params;
      const data = req.body;
      const updated = await updatePais(idPais, data);
      if (updated) {
        res.status(200).json({ message: "País actualizado exitosamente" });
      } else {
        res.status(404).json({ message: "País no encontrado o sin cambios" });
      }
    } catch (error) {
      console.error("Error al actualizar país:", error);
      res.status(500).json({ message: "Error al actualizar país", error });
    }
  };
  
  export const deleteExistingPais = async (req, res) => {
    try {
      const { idPais } = req.params;
      const deleted = await deletePais(idPais);
      if (deleted) {
        res.status(200).json({ message: "País eliminado exitosamente" });
      } else {
        res.status(404).json({ message: "País no encontrado" });
      }
    } catch (error) {
      console.error("Error al eliminar país:", error);
      res.status(500).json({ message: "Error al eliminar país", error });
    }
  };
  
import Artefacto from "../models/artefacto.models.js";
import mongoose from "mongoose";

// Obtener todos los artefactos
export const getAllArtefactos = async (req, res) => {
  try {
    const artefactos = await Artefacto.find({}, { __v: 0 });
    if (artefactos.length === 0) {
      return res.status(404).json({ msg: "No se encontraron artefactos" });
    }
    return res.status(200).json({ artefactos });
  } catch (error) {
    return res.status(500).json({ msg: "Error al obtener los artefactos" });
  }
};

// Obtener artefacto por ID
export const getArtefactoById = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ msg: "ID no válido" });
    }

    const artefacto = await Artefacto.findById(id);
    if (!artefacto) {
      return res.status(404).json({ msg: "Artefacto no encontrado" });
    }
    return res.status(200).json({ artefacto });
  } catch (error) {
    return res.status(500).json({ msg: "Error al obtener el artefacto" });
  }
};

// Buscar artefactos por nombre parcial
export const getArtefactosByNombre = async (req, res) => {
  const { nombre } = req.params;
  try {
    if (!nombre || typeof nombre !== "string") {
      return res.status(400).json({ msg: "Nombre no válido" });
    }

    const artefactos = await Artefacto.find({
      nombre: { $regex: nombre, $options: "i" }, // Búsqueda insensible a mayúsculas
    });

    if (artefactos.length === 0) {
      return res
        .status(404)
        .json({ msg: "No se encontraron artefactos con ese nombre" });
    }
    return res.status(200).json({ artefactos });
  } catch (error) {
    return res.status(500).json({ msg: "Error al obtener los artefactos" });
  }
};

// Crear un nuevo artefacto
export const postArtefacto = async (req, res) => {
  const { nombre, categoria, precio, disponibilidad, descripcion } = req.body;
  const nuevoArtefacto = new Artefacto({
    nombre,
    categoria,
    precio,
    disponibilidad,
    descripcion,
  });

  try {
    const validationError = nuevoArtefacto.validateSync();
    if (validationError) {
      const errorMessages = Object.values(validationError.errors).map(
        (error) => error.message
      );
      return res.status(400).json({ errors: errorMessages });
    }

    await nuevoArtefacto.save();
    return res.status(201).json({
      msg: "Artefacto guardado correctamente",
      artefacto: nuevoArtefacto,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Error al guardar el artefacto" });
  }
};

// Actualizar un artefacto por ID
export const putArtefacto = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ msg: "ID no válido" });
    }

    const artefacto = await Artefacto.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!artefacto) {
      return res
        .status(404)
        .json({ msg: "Artefacto no encontrado o actualizado" });
    }
    return res.status(200).json({
      msg: "Artefacto actualizado correctamente",
      artefacto,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Error al actualizar el artefacto" });
  }
};

// Eliminar un artefacto por ID
export const deleteArtefacto = async (req, res) => {
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ msg: "ID no válido" });
    }

    const artefacto = await Artefacto.findByIdAndDelete(id);
    if (!artefacto) {
      return res
        .status(404)
        .json({ msg: "Artefacto no encontrado o eliminado" });
    }
    return res.status(200).json({
      msg: "Artefacto eliminado correctamente",
      artefacto,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Error al eliminar el artefacto" });
  }
};

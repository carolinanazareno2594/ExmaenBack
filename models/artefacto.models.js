import mongoose from "mongoose";

const artefactoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del artefacto es obligatorio"], // Obligatorio con mensaje personalizado
    trim: true, // Elimina espacios innecesarios
  },
  categoria: {
    type: String,
    enum: ["Electrodoméstico", "Herramienta", "Dispositivo", "Otro"], // Valores permitidos
    required: [true, "La categoría es obligatoria"], // Obligatorio
  },
  precio: {
    type: Number,
    required: [true, "El precio es obligatorio"], // Obligatorio con mensaje personalizado
    min: [0, "El precio no puede ser negativo"], // Validación de mínimo
  },
  disponibilidad: {
    type: String,
    enum: ["Disponible", "Agotado", "En pedido"], // Valores permitidos
    default: "Disponible", // Valor predeterminado
  },
  descripcion: {
    type: String,
    maxlength: [500, "La descripción no puede superar los 500 caracteres"], // Longitud máxima
  },
});

const Artefacto = mongoose.model("Artefacto", artefactoSchema);

export default Artefacto;

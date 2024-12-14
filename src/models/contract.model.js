import mongoose from "mongoose";

const contractSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    contenido: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Contract", contractSchema);

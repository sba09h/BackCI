import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true,
    },
    correo: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    run: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    numeroDoc: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    docFirmados: [{
        idDocumento: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contract"
        }
    }],
}, {
    timestamps: true,
});

export default mongoose.model("User", userSchema);
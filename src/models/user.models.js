import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true,
    },
    correo: {
        type: String,
        required: true,
        trim: true,
    },
    RUN: {
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
})

export default mongoose.model("User", userSchema)
import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import {createAccessToken} from "../libs/jwt.js";


export const register = async (req, res) => {
    const {nombre, correo, run, numeroDoc} = req.body;
    try {
        const runHash = await bcrypt.hash(run, 10);
        const numHash = await bcrypt.hash(numeroDoc, 10);
        
        const newUser = new User({
            nombre,
            correo,
            run: runHash,
            numeroDoc: numHash,
        });
        
        const userSaved = await newUser.save();
        const token = await createAccessToken({id: userSaved._id})
        res.cookie("token", token);
        res.json({
            id: userSaved._id,
            nombre: userSaved.nombre,
            correo: userSaved.correo,
            run: userSaved.run,
            numeroDoc: userSaved.numeroDoc,
            createdAt: userSaved.createAt,
            updateAt: userSaved.updateAt,
        });  
         
        } catch (error) {
        res.status(500).json({message: error.mesage});
    }
};
    
export const login  = async (req, res) => {
    console.log(req.body)
    const {correo, run} = req.body;
    try {
        const userFound = await User.findOne({correo})
        if(!userFound) return res.status(400).json({message: "User not found"});
        const isMatch = await bcrypt.compare(run, userFound.run); 
        if(!isMatch) return res.status(400).json({message: "run incorrecto"});

        const token = await createAccessToken({id: userFound._id})
        res.cookie("token", token);
        res.json({
            id: userFound._id,
            nombre: userFound.nombre,
            correo: userFound.correo,
            run: userFound.run, 
            numeroDoc: userFound.numeroDoc,
            createdAt: userFound.createAt,
            updateAt: userFound.updateAt,
        });  
         
        } catch (error) {
        res.status(500).json({message: error.mesage});
    }
}; 

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.status(200);
};

export const sign = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if(!userFound) return res.status(400).json({message: "User no encontrado"});

    return res.json({
        id: userFound-_id,
        nombre: userFound.nombre,
        correo: userFound.correo,
        run: userFound.run,
        numeroDoc: userFound.numeroDoc,
        createdAt: userFound.createdAt,
        updateAt: userFound.updateAt,
    });
};
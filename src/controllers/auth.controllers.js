import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import {createAccessToken} from "../libs/jwt.js";
import { TOKEN_S } from "../../config.js";
import Contract from "../models/contract.model.js";
import { sendEmail, transporter } from "../helpers/mail.js";


export const register = async (req, res) => {
    const {nombre, correo, run, numeroDoc} = req.body;
    
    try {
        const userFound = await User.findOne({correo})
        if(userFound) return res.status(400).json( ["El correo ya existe"]);;

        const runHash = await bcrypt.hash(run, 10);
        
        const newUser = new User({
            nombre,
            correo,
            run: runHash,
            numeroDoc,
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
        console.log(error)
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
        path: "/",
    });
    return res.status(200);
};

export const dash = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if(!userFound) return res.status(400).json({message: "User no encontrado"});

    return res.json({
        id: userFound._id,
        nombre: userFound.nombre,
        correo: userFound.correo,
        run: userFound.run,
        numeroDoc: userFound.numeroDoc,
        createdAt: userFound.createdAt,
        updateAt: userFound.updateAt,
    });
};

export const verifyToken = async (req, res) =>{
    const {token} = req.cookies

    if(!token) return res.status(401).json({message: "No autorizado"});

    jwt.verify(token, TOKEN_S, async (err, user) => {
        if(err) return res.status(401).json({message: "No autorizado"});

        const userFound = await User.findById(user.id)
        if(!userFound) return res.status(401).json({message: "No autorizado"});

        return res.json({
            id: userFound._id,
            correo: userFound.correo,
            run: userFound.run,
        });  
    });
};

//funcion sign
export const sign = async (req, res) => {
    const {run, numeroDoc, idContrato} = req.body;
    console.log(req.body)
    try {
        const userFound = await User.findOne({numeroDoc})
        if(!userFound) return res.status(400).json({message: "number not found"});
        // const esIgual = await bcrypt.compare(run, userFound.run);
        if(run!= userFound.run) return res.status(400).json({message: "run no encontrado"});
        const contratoFound = await Contract.findById({_id: idContrato})
        if(!contratoFound) return res.status(400).json({message: "id not found"});
        
        //asociar contrato a usuario
        userFound.docFirmados.push(contratoFound._id);
        await userFound.save();
        await mandarCorreo(userFound, contratoFound);
        res.status(200).json({message: "contrato asociado"});
        
        } catch (error) {
        res.status(500).json({message: error.mesage});
    }
        
}

export const contratosFirmados = async (req, res) => {
    const {numeroDoc} = req.params
    try {
        const user  = await User.findOne({numeroDoc});
    if(!user) return res.status(400).json({message: "Error en usuario y/o contrato no encontrados"})
        const idContratos = user.docFirmados.map(element => element._id);
        const contratos = await Contract.find({_id: {$in:idContratos}})
        console.log(contratos)
        res.status(200).json({contratos: contratos});
    } catch (error) {
        res.status(500).json({message: error.mesage});
    }
    
}

export const mandarCorreo = async (user, contrato) => {
    const html = `<h1>Contrato Firmado</h1>
    <p>Hola ${user.nombre}, has firmado el siguiente contrato:</p>
    <ul>
      <li><strong>${contrato.titulo}</strong>: ${contrato.contenido}</li>
    </ul>`
    await sendEmail(user.correo, "test", html)
}


    
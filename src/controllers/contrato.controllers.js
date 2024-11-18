import contractModel from "../models/contract.model.js";


export const getAllContratos  = async (req, res) => {

    try {
        const contratos = await contractModel.find();
        res.status(200).json({contratos});
         
        } catch (error) {
        res.status(500).json({message: error.mesage});
    }
}; 

export const getContratoById  = async (req, res) => {

    try {
        const contrato = await contractModel.findById(req.params.id);
        if(!contrato){
            res.status(404).json({error: "Contrato no encontrado"});    
        }
        res.status(200).json({contrato});
         
        } catch (error) {
        res.status(500).json({message: error.mesage});
    }
}; 



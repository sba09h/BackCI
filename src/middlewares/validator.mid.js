import { Schema } from "zod";

export const ValidateSchema = (Schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next()
    } catch (error) {
        return res.status(400).json({error: error.errors.map(error => error.message )});
    }
};
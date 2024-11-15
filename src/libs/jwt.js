import jwt from "jsonwebtoken";
import {TOKEN_S} from "../../config.js";

export function createAccessToken(payload){
    return new Promise((resolve, reject) => { 
        jwt.sign(
            payload,
            TOKEN_S,
            {
                expiresIn: "1d",
            }, 
            (err, token) => {
                if (err) PromiseRejectionEvent(err)
                resolve(token)  
                

            }
        )
        
    });
    
    
}
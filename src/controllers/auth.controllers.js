import User from "../models/user.models.js"

export const register = async (req, res) => {
    const {nombre, correo, RUN, numeroDoc} = req.body;
    console.log(nombre, correo, RUN, numeroDoc)

    try {
        const newUser = new User({
            nombre,
            correo,
            RUN,
            numeroDoc
        })
        
        await newUser.save();
        res.json(userSaved)
        res.send(">>>registrando...");
    } catch (error) {
        console.log(error);
    }

    

}
    
export const login = (req, res) => res.send("register");
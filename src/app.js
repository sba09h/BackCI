import express from "express";
import cors from "cors";
import { conectar } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

//aqui creamos una instancia de express
const app = express();
conectar();
app.use(cors());

//seba... morgan?
app.use("/api", authRoutes);
app.use(express.json());

app.get("/registrar", (req, res) => {
    res.send('registrando usuario...')
} )

const puerto = 3000;

app.listen(puerto, ()=>{
    console.log("el servidor esta escuchando en puerto 3000")
})


export default app;
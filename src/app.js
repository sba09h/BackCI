import express from "express";
import { conectar } from "../db.js";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import puerto from "../index.js"
import signRoutes from "./routes/auth.sign.js";

const app = express();

conectar();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", signRoutes);

export default app;

// app.get("/registrar", (req, res) => {
//     res.send('registrando usuario...')
// } )


// })
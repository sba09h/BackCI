import express from "express";
import { conectar } from "../db.js";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import contratoRoutes from "./routes/contrato.routes.js";
import signRoutes from "./routes/auth.sign.js";


const app = express();

conectar();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: "http://localhost:5173", credentials: true, }));

app.use("/api", authRoutes);
app.use("/api", signRoutes);
app.use("/api", contratoRoutes);

export default app;

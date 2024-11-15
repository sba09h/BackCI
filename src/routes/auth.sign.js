import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();
router.get("/sign", authRequired, (req, res)=> res.send("task"))

export default router;
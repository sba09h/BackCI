import { Router } from "express";
import { login, register, logout, sign, verifyToken } from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
// import { ValidateSchema } from "../middlewares/validator.mid.js";
// import { validateLogin, validateRegister } from "../schemas/auth.ci.js";

const router = Router()

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/verify", verifyToken);

router.get("/sign", authRequired, sign);


export default router;
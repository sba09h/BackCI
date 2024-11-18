import { Router } from "express";
import { login, register, logout, sign, verifyToken, dash, contratosFirmados } from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
// import { ValidateSchema } from "../middlewares/validator.mid.js";
// import { validateLogin, validateRegister } from "../schemas/auth.ci.js";

const router = Router()

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/verify", verifyToken);

router.get("/dash", authRequired, dash);

//nueva ruta para firmar contrato y asociar ID de contrato
router.post("/sign", sign);

//traer contrato desde bke al fe
router.get("/getContratosFirmados/:numeroDoc", contratosFirmados);

//consultar contrato firmado


export default router;
import {
  getAllContratos,
  getContratoById,
} from "../controllers/contrato.controllers.js";
import { Router } from "express";

const router = Router();

router.get("/contratos", getAllContratos);

router.get("/contratos/:id", getContratoById);

export default router;

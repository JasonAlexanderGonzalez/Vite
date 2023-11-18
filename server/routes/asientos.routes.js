import { Router } from "express";
import {
  getAsientos,
  getAsiento,
  getAsientosNM,
  createAsiento,
  getCatalogo,
  putActualizarSaldo,
  getCuentasD,
  getCuentasH,
  getCuentasGastos,
  getCuentasIngresos,
  putActualizarPerdidasGanancias,
  getCuentasActivos,
  getCuentasPasivosCapital
} from "../controller/asientos.controller.js";

const router = Router();

router.get("/asientos", getAsientos);

router.get("/catalogo", getCatalogo);

router.get("/asientos/nm", getAsientosNM);

router.get("/asientos/:numeroCuenta", getAsiento);

router.post("/asientos", createAsiento);

router.put("/catalogo/act", putActualizarSaldo);

router.put("/catalogo/actualizarPerdidasGanancias", putActualizarPerdidasGanancias);

router.get("/catalogo/cuentasD", getCuentasD);

router.get("/catalogo/cuentasH", getCuentasH);

router.get("/catalogo/cuentasGastos", getCuentasGastos);

router.get("/catalogo/cuentasIngresos", getCuentasIngresos);

router.get("/catalogo/cuentasActivos", getCuentasActivos);

router.get("/catalogo/cuentasPasivosCapital", getCuentasPasivosCapital);


export default router;

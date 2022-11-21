import * as express from "express";
import PiadaController from "../controllers/piadaController.js";

const proutes = express.Router();
const piadaController = new PiadaController();

proutes.get("/piada", piadaController.consultarPiada); //Retorna todas
proutes.get("/piada/:id", piadaController.consultarUmaPiada); // Pesquisa pelo id
proutes.post("/piada", piadaController.consultarPiada); // Pesquisa pelo titulo da piada
proutes.get("/piadaAleatoria", piadaController.piadaAleatoria);
proutes.post("/savePiada", piadaController.salvarPiada);

export default proutes
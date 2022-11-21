import * as express from "express";
import CategoriaController from "../controllers/categoriaController.js";

const croutes = express.Router();
const categoriaController = new CategoriaController();

croutes.get("/categoria", categoriaController.consultarCategoria); //Retorna todas

export default croutes;

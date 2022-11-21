import CategoriaDAL from "../dals/categoriaDal.js";
import Conexao from "../database/Conexao.js";

export default class CategoriaController {
  async consultarCategoria(req, res) {
    const categoriaDal = new CategoriaDAL(new Conexao().conectar());
    let data = await categoriaDal.consultarCategoria();
    if (data.length == 0) {
      res.status(404).json({ error: "Nenhuma categoria encontrada." });
    } else {
      res.status(200).json(data);
    }
  }
}

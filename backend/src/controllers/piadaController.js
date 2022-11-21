import Piada from "../models/piada.js";
import PiadaDAL from "../dals/piadaDal.js";
import Conexao from "../database/Conexao.js";

export default class PiadaController {
  async salvarPiada(req, res) {
    let { titulo, texto, categoria } = req.body;
    const piadaDal = new PiadaDAL(new Conexao().conectar());
    let piada = new Piada(undefined, titulo, texto, categoria);

    if (!piadaDal.savePiada(piada)) {
      res.status(500).json({ error: "Ocorreu ao inserir nova piada!" });
    } else {
      res.status(200).json({ sucesso: "Piada inserida com sucesso!" });
    }
  }
  async consultarPiada(req, res) {
    let titulo = req.body.titulo;
    const piadaDal = new PiadaDAL(new Conexao().conectar());
    let data = await piadaDal.consultarPiadas(titulo);
    if (data.length == 0) {
      res
        .status(404)
        .json({ error: "Nenhuma piada encontrada com esse título." });
    } else {
      res.status(200).json(data);
    }
  }
  async consultarUmaPiada(req, res) {
    let id = req.params.id;
    const piadaDal = new PiadaDAL(new Conexao().conectar());
    let data = await piadaDal.consultarUmaPiada(id);
    if (data == undefined) {
      res.status(404).json({ error: "Nenhuma piada encontrada com esse _id." });
    } else {
      res.status(200).json(data);
    }
  }
  async piadaAleatoria(req, res) {
    const piadaDal = new PiadaDAL(new Conexao().conectar());
    let data = await piadaDal.consultaPiadaAleatoria();
    if (data == undefined) {
      res.status(404);
    } else {
      res.status(200).json(data);
    }
  }
}

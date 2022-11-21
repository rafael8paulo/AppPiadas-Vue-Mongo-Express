import Conexao from "../database/Conexao.js";
import { ObjectId } from "mongodb";

export default class CategoriaDAL {
  constructor(db) {
    this.collection = (async () => {
      return db.then((dbo) => dbo.collection("categoria"));
    })();
  }

  async consultarCategoria(filtro) {
    try {
      let dados = await this.collection.then((dbo) => dbo.find({}).toArray());
      return dados;
    } catch (erro) {
      console.log(erro);
    }
  }
}

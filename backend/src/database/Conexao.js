import { MongoClient } from "mongodb";
const url = "mongodb://127.0.0.1:27017/";

export default class Conexao {
  async conectar() {
    let db = await MongoClient.connect(url);
    return await db.db("piadasdb");
  }
}

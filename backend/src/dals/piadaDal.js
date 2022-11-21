import Conexao from "../database/Conexao.js";
import { ObjectId } from "mongodb";
import { MongoClient } from "mongodb";

export default class PiadaDAL {
  constructor(db) {
    this.collection = (async () => {
      return db.then((dbo) => dbo.collection("piada"));
    })();
  }

  async savePiada(piada) {
    try {
      let dados = await this.collection.then((dbo) => dbo.insertOne(piada));
      if (dados != undefined) return true;
    } catch (erro) {
      console.log(erro);
    }
    return false;
  }
  async consultarPiadas(filtro) {
    let dados = undefined;
    try {
      if (filtro == undefined) {
        await this.collection.then(async (dbo) => {
          dados = await dbo
            .aggregate([
              {
                $lookup: {
                  from: "categoria",
                  localField: "categoria_id",
                  foreignField: "_id",
                  as: "categoria",
                },
              },
            ])
            .sort({ _id: -1 })
            .toArray();
        });
      } else {
        await this.collection.then(async (dbo) => {
          dados = await dbo
            .aggregate([
              {
                $match: {
                  titulo: filtro,
                },
              },
              {
                $lookup: {
                  from: "categoria",
                  localField: "categoria_id",
                  foreignField: "_id",
                  as: "categoria",
                },
              },
            ])
            .sort({ _id: -1 })
            .toArray();
        });
      }
      return dados;
    } catch (erro) {
      console.log(erro);
    }
  }
  async consultarUmaPiada(id) {
    let data = undefined;
    try {
      await this.collection.then(async (dbo) => {
        data = await dbo
          .aggregate([
            {
              $match: {
                _id: ObjectId(id),
              },
            },
            {
              $lookup: {
                from: "categoria",
                localField: "categoria_id",
                foreignField: "_id",
                as: "categoria",
              },
            },
          ])
          .sort({ _id: -1 })
          .toArray();
      });
      return data;
    } catch (erro) {
      console.log(erro);
    }
  }
  async consultaPiadaAleatoria() {
    let data = undefined;
    try {
      data = await this.consultarPiadas(undefined);
      let tamanho = data.length;
      let random = Math.floor(Math.random() * tamanho + 1);
      let piada = data[random];
      // console.log(` Piada ${piada} \n random ${random} \n tamanho ${tamanho} `);
      return piada;
    } catch (error) {
      console.log(error);
    }
  }
}

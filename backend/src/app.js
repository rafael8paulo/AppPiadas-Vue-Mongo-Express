import express from "express";
import proutes from "./routes/piadaroute.js";
import croutes from "./routes/categoriaroute.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(proutes);
app.use(croutes);

app.listen(8081, () => {
  console.log("Servidor na porta 8081");
});

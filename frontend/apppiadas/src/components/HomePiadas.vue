<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <a type="button" class="btn btn-warning" href="/#/NovaPiada"
          >Cadastrar piada</a
        >
        <a
          type="button"
          class="btn btn-success"          
          @click.stop="dialog = true"
          @click="piadaAleatoria()"
          >Piada Aleatoria</a
        >
        <form method="POST" action="/savePiada">
          <input
            name="txtPesquisa"
            placeholder="Digite o título da piada..."
            class="form-control"
            type="text"
            v-model.lazy="txtPesquisa"
          />
          <div class="d-grid gap-2">
            <button type="button" class="btn btn-primary" @click="pesquisar">
              Pesquisar
            </button>
          </div>
        </form>
      </div>

      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Título</th>
              <th scope="col">Categoria</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in this.piadas" :key="p._id">
              <td>{{ p.titulo }}</td>
              <td>{{ p.categoria[0].descricao }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-info"
                  dark
                  @click.stop="dialog = true"
                  @click="setDialogPiada(p)"
                >
                  Detalhes
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          {{ this.dialogTitulo }}
        </v-card-title>
        <v-card-text>
          {{ this.dialogCategoria }}
        </v-card-text>
        <v-card-text>
          {{ this.dialogTexto }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  name: "NovaPiada",
  data() {
    return {
      piadas: "",
      txtPesquisa: "",
      dialog: false,
      dialogTitulo: "",
      dialogTexto: "",
      dialogCategoria: "",
    };
  },
  methods: {
    carregarPiadas() {
      axios
        .get("http://localhost:8081/piada")
        .then((dados) => {
          this.piadas = dados.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    pesquisar() {
      axios
        .post("http://localhost:8081/piada", { titulo: this.txtPesquisa })
        .then((dados) => {
          this.piadas = dados.data;
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data.error);
        });
    },
    setDialogPiada(piada) {
      this.dialogTitulo = piada.titulo;
      this.dialogTexto = piada.texto;
      this.dialogCategoria = piada.categoria[0].descricao;
    },
    piadaAleatoria() {
      axios
        .get("http://localhost:8081/piadaAleatoria")
        .then((piada) => {
          piada = piada.data;
          console.log(piada);
          this.dialogTitulo = piada.titulo;
          this.dialogTexto = piada.texto;
          this.dialogCategoria = piada.categoria[0].descricao;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.carregarPiadas();
  },
};
</script>

<style scoped>
.container {
  margin-top: 2%;
}

input,
textarea,
select,
button,
a {
  margin-bottom: 1%;
}
a{
  margin-right: 2%;
}
</style>

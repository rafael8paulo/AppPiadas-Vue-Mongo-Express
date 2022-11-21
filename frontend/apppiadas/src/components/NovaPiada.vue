<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <h3>Cadastrar nova piada</h3>
        <form method="POST" action="/savePiada">
          <input
            name="titulo"
            placeholder="Titulo"
            class="form-control"
            type="text"
            v-model.lazy="titulo"
          />
          <textarea
            name="texto"
            class="form-control"
            id="texto"
            cols="30"
            rows="10"
            v-model.lazy="texto"
          ></textarea>
          <select
            class="form-select"
            v-model="categoria"
            name="titulo"
            id="titulo"
            @change="carregarCategorias()"
          >
            <option
              v-for="c in this.categorias"
              :key="c._id"
              v-bind:value="{ _id: c._id }"
            >
              {{ c.descricao }}
            </option>
          </select>
          <div class="d-grid gap-2">
            <button type="button" class="btn btn-primary" @click="salvar">
              Salvar
            </button>
          </div>
          <br>
          <div class="d-grid gap-2">
            <a type="button" class="btn btn-danger" href="/">
              Voltar
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NovaPiada",
  data() {
    return {
      categorias: "",
      titulo: "",
      texto: "",
      categoria: "",
    };
  },
  methods: {
    carregarCategorias() {
      axios
        .get("http://localhost:8081/categoria")
        .then((dados) => {
          this.categorias = dados.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    salvar() {
      let novaPiada = {
        titulo: this.titulo,
        texto: this.texto,
        categoria: this.categoria._id,
      };
      axios
        .post("http://localhost:8081/savePiada", novaPiada)
        .then((res) => {
          console.log(res);
          alert(res.data.sucesso);
        })
        .catch((error) => {
          console.log(error);
        });
      router.push("/");
      this.$router.push("/");
    },
  },
  mounted() {
    this.carregarCategorias();
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
button {
  margin-top: 2%;
}
</style>

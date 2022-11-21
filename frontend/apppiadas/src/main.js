import { createApp, VueElement } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.css";

loadFonts();

createApp(App).use(router).use(vuetify).use(bootstrap).mount("#app");

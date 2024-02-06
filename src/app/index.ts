import {createApp} from "vue";
import router from "./providers/router";
import {createPinia} from "pinia";
import App from "./index.vue";
import "./index.scss"

const pinia = createPinia()

export const app = createApp(App).use(router).use(pinia)
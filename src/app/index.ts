import {createApp} from "vue";
import {createPinia} from "@/app/providers/store.ts"
import router from "./providers/router.ts";
import App from "./index.vue";
import "./index.scss"
import axiosInstance from "@/app/providers/axios.ts";


export const app = createApp(App).use(createPinia).use(router).use(axiosInstance)
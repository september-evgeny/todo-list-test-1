import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router';
import mockServer from "./server"

const isDev: boolean = process.env.NODE_ENV === "development"

const pinia = createPinia()
const app = createApp(App)


if (isDev) {
  mockServer()
}

app
  .use(router)
  .use(pinia)
  .mount('#app')

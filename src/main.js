import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/router.js"
import store from "./StoreVueX/Store.js"
import "@fortawesome/fontawesome-free/css/all.min.css"



const app = createApp(App)
// Install the store instance as a plugin
app.use(store)
app.use(router)
app.mount('#app')
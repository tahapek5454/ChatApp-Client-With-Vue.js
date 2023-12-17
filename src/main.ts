import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './utils/store'
import appAxios from './utils/appAxios'

const app = createApp(App)
app.use(store)
app.use(router)


app.config.globalProperties.$appAxios = appAxios;

app.mount('#app')

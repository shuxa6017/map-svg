// *** CORE ***
import { createApp } from 'vue'
// ---------------------------
// *** STYLES ***
import '@/assets/css/tailwind.css'
import '@/assets/css/main.css'
import '@/assets/icomoon/style.css'
// ---------------------------
// *** PLUGINS ***
import router from './router'
import { createYmaps } from 'vue-yandex-maps';
// *** COMPONENTS ***
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(createYmaps({
    apikey: '9191d860-42c5-4e70-98aa-8c92721bbdc3',
}));
app.mount('#app')

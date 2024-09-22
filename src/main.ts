// *** CORE ***
import { createApp } from 'vue'
// ---------------------------
// *** STYLES ***
import '@/assets/css/tailwind.css'
import '@/assets/css/main.css'
// ---------------------------
// *** PLUGINS ***
import router from './router'
// *** COMPONENTS ***
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.mount('#app')

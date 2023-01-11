import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { cors } from 'cors'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

// CORS
// const cors = require('cors')

app.use(createPinia())
app.use(router)

// CORS
// app.use(cors({
//     origin: 'http://127.0.0.1:5173/',
// }))

app.mount('#app')

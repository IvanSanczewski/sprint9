import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { cors } from 'cors'

import App from './App.vue'
import router from './router'

import './assets/main.css'

// /* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
// /* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// /* import specific icon libraries */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// /* add icons to the library */
library.add( fas, fab )




const app = createApp(App)

// CORS
// const cors = require('cors')

app.use(createPinia())
app.use(router)

// CORS
// app.use(cors({
//     origin: 'http://127.0.0.1:5173/',
// }))

app.component('font-awesome-icon', FontAwesomeIcon)
    
app.mount('#app')

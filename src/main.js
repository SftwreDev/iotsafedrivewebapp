import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueHtmlToPaper from './plugins/VueHtmlToPaper'
import VueApexCharts from 'vue3-apexcharts'

const options = {
    name: '_blank',
    specs: [
        'fullscreen=yes',
        'titlebar=yes',
        'scrollbars=yes'
    ],
    styles: [
        '/datatable.css'
    ],
    timeout: 1000, // default timeout before the print window appears
    autoClose: true, // if false, the window will not close after printing
    windowTitle: window.document.title // override the window title
}


const app = createApp(App)
const pinia = createPinia()

app.use(VueHtmlToPaper, options)
app.use(VueApexCharts)
app.use(pinia)
app.use(router)
app.mount('#app')
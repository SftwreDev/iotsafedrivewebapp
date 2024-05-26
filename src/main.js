import './assets/main.css'
import './assets/ag-grid-theme-builder.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueHtmlToPaper from './plugins/VueHtmlToPaper'
import VueApexCharts from 'vue3-apexcharts'
import { registerLicense } from '@syncfusion/ej2-base'
import { GridPlugin } from '@syncfusion/ej2-vue-grids'

const options = {
    name: '_blank',
    specs: ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
    styles: ['/datatable.css'],
    timeout: 1000, // default timeout before the print window appears
    autoClose: true, // if false, the window will not close after printing
    windowTitle: window.document.title // override the window title
}

registerLicense(
    'Ngo9BigBOggjHTQxAR8/V1NBaF1cXmhPYVFpR2Nbe05zflBFalxYVAciSV9jS3pTc0dlWXxbc3RcRmhUVA=='
)

const app = createApp(App)
const pinia = createPinia()

app.use(VueHtmlToPaper, options)
app.use(VueApexCharts)
app.use(pinia)
app.use(router)
app.use(GridPlugin)

app.mount('#app')

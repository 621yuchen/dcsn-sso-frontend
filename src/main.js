import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import route from './router'  // 自动导入 router/index.js
const app = createApp(App)
app.use(ElementPlus)
app.use(route)
app.mount('#app')


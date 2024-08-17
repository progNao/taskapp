/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import axios from 'axios';

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

// グローバルにaxiosを設定
app.config.globalProperties.$axios = axios;

registerPlugins(app)

app.mount('#app')

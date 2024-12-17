import './assets/css/satoshi.css'
import './assets/css/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// import PrimeVue from 'primevue/config';
import { createI18n } from 'vue-i18n';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import messages from '@/lang/index';
const i18n = createI18n({
    legacy: false,
    locale: 'en', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages,
})
const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router);
app.use(i18n);
app.mount('#app')

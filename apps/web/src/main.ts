import './assets/main.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import router from '@/router';
import App from './App.vue';
import socketPlugin from '@/stores/plugins/socketPlugin';

const app = createApp(App);

const pinia = createPinia();
pinia.use(socketPlugin);

app.use(pinia);
app.use(router);

app.mount('#app');

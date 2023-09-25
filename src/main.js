import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router configuration
import store from './store/store.js'; // Import the Vuex store

const app = createApp(App);
app.use(router); // Use the router
app.use(store); // Use the Vuex store
app.mount('#app');
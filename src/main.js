import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router configuration
import store from './store/store.js'; // Import the Vuex store

const app = createApp(App);
app.use(router); // Use the router
app.use(store); // Use the Vuex store

app.directive('auto-focus', {
    mounted(el) {
      el.focus();
    }
  });

  app.directive('tooltip', {
    beforeMount(el, binding) {
        let mainStyle = `
        position: absolute;
        z-index: 1000;
        background-color: white;
        color: #333;
        padding: 5px 10px;
        border-radius: 4px;
        transition: 0.3s;
        opacity: 0;
        pointer-events: none;
        font-size: 10px;
        bottom: 100%;   /* Position tooltip above the element */
        left: 50%;      /* Center tooltip */
        transform: translateX(-50%); /* Ensure it's centered */
        font-family: arial;
        width: 120px;
        `;
        
        let tooltipElem = document.createElement('div');
        tooltipElem.style.cssText = mainStyle;
        tooltipElem.innerHTML = binding.value;
        
        el.appendChild(tooltipElem);
        
        el.addEventListener('mouseover', () => {
            tooltipElem.style.opacity = '1';
            tooltipElem.style.transform = 'translateX(-50%) translateY(-5px)';
        });

        el.addEventListener('mouseout', () => {
            tooltipElem.style.opacity = '0';
            tooltipElem.style.transform = 'translateX(-50%) translateY(0)';
        });
    }
});
  
app.mount('#app');
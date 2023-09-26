import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import FoopyFeed from '../views/FoopyFeed.vue';
import Store from '../views/Store.vue';
import ShoppingCart from '../views/ShoppingCart.vue';
import RegistrationForm from '../views/RegistrationForm.vue';
import TacticsBoard from '../views/TacticsBoard.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/FoopyFeed', component: FoopyFeed },
  { path: '/store', component: Store },
  { path: '/cart', component: ShoppingCart },
  { path: '/CustomerRegistration', component: RegistrationForm },
  { path: '/TacticsBoard', component: TacticsBoard },
  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

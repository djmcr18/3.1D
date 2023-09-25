import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import FoopyFeed from '../views/FoopyFeed.vue';
import Forums from '../views/Forums.vue';
import Store from '../views/Store.vue';
import ShoppingCart from '../views/ShoppingCart.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/FoopyFeed', component: FoopyFeed },
  { path: '/forums', component: Forums },
  { path: '/store', component: Store },
  { path: '/cart', component: ShoppingCart },
  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

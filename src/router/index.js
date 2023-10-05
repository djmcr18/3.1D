import { createRouter, createWebHistory } from 'vue-router';
import { auth } from "../firebase.js";

import Home from '../views/Home.vue';
import FoopyFeed from '../views/FoopyFeed.vue';
import Store from '../views/Store.vue';
import ShoppingCart from '../views/ShoppingCart.vue';
import RegistrationForm from '../views/RegistrationForm.vue';
import TacticsBoard from '../views/TacticsBoard.vue';
import LoginForm from '../views/LoginForm.vue';
import Forums from '../views/Forums.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/FoopyFeed', component: FoopyFeed },
  { path: '/store', component: Store },
  { path: '/cart', component: ShoppingCart },
  { path: '/CustomerRegistration', component: RegistrationForm },
  { path: '/TacticsBoard', component: TacticsBoard },
  { path: '/login', component: LoginForm },
  { path: '/:pathMatch(.*)*', component: NotFound },
  {
    path: '/forums',
    name: 'Forums',
    component: Forums,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,

  // Add the scrollBehavior method:
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;

  if (requiresAuth && !isAuthenticated) {
    next({ path: '/login', query: { from: to.name } });  // passing the name of the route the user was trying to access
  } else {
    next();
  }
});


export default router;

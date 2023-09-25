// store.js (store)

import { createStore } from 'vuex';

const store = createStore({
  state: {
    cart: [], // Initialize an empty shopping cart
  },
  mutations: {
    addToCart(state, product) {
      state.cart.push(product);
    },
    removeFromCart(state, productIndex) {
      state.cart.splice(productIndex, 1);
    },
    decrementCartItem(state, product) {
      const index = state.cart.findIndex((item) => item.id === product.id);
      if (index !== -1 && state.cart[index].quantity > 1) {
        state.cart[index].quantity -= 1;
      } else {
        state.cart.splice(index, 1);
      }
    },
    removeAllFromCart(state, product) {
      state.cart = state.cart.filter((item) => item.id !== product.id);
    },
  },
  getters: {
    cartTotal(state) {
      return state.cart.length;
    },
  },
});

export default store;

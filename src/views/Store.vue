<!-- components/Store.vue -->

<template>
    <div class="store">
      <h1 class="store-title">FoopyOnline Store</h1>
      <p>Best prices guaranteed.</p>
      <br><br>
      <div class="product-list">
        <div v-for="(product, index) in products" :key="index" class="product">
          <img :src="`/img/${product.image}`" alt="Product Image" class="product-image">
          <div class="product-info">
            <h2>{{ product.name }}</h2>
            <p>Price: ${{ product.price }}</p>
          </div>
          <button @click="addToCart(product)" class="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
    </div>
  </template>

  <script>
  import { mapMutations } from 'vuex';
  
  export default {
    data() {
      return {
        products: [
          { id: 1, name: 'Champions League Ball', price: 189, image: 'ChampionsLeagueBall.jpeg' },
          { id: 2, name: 'Mizuno Morelia Neo 3 MIJ', price: 550, image: 'MoreliaNeo3.jpeg' },
          { id: 3, name: 'Nike J Guards', price: 20, image: 'Jguard.jpeg' },
        ],
      };
    },
    methods: {
      ...mapMutations(['addToCart']),
    },
  };
  </script>
  
  <style scoped>
/* components/Store.vue scoped styles */

.store {
  text-align: center;
  padding: 20px;
}

.store-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.product {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 200px;
}

.product h2 {
  font-size: 18px;
}

.add-to-cart-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-to-cart-button:hover {
  background-color: #333;
}

.product-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}
</style>
<!-- components/Store.vue -->

<template>
  <div class="store">
    <h1 class="store-title">FoopyOnline Store</h1>
    <h3>Best prices guaranteed.</h3>
    <br><br>
    <div class="product-list">
      <div v-for="(product, index) in products" :key="index" class="product">
        <div class="product-image-container">
          <img :src="`/img/${product.image}`" alt="Product Image" class="product-image">
        </div>
        <div class="product-info">
          <h2>{{ product.name }}</h2>
          <div class="price-button-group">
            <p>Price: ${{ product.price }}</p>
            <button @click="addToCart(product)" class="add-to-cart-button">Add to Cart</button>
          </div>
        </div>
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
          { id: 4, name: 'Amo Sock Tape', price: 8, image: 'AmoSockTape.png' },
          { id: 5, name: 'Trusox', price: 40, image: 'trusox.png' },
          { id: 6, name: 'Foam Roller', price: 30, image: 'FoamRoller.png' },
          { id: 7, name: 'Select Neck Warmer', price: 25, image: 'SelectNeckWarmer.png' },
          { id: 8, name: 'Gatorade Barrel', price: 59, image: 'GatoradeBottle.png' },
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
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  background-color: var(--color-background-soft);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.store-title {
  font-size: 36px;
  margin-bottom: 20px;
  color: var(--color-heading);
  padding: 20px;
  border-bottom: 1px solid var(--color-border);
  text-align: center;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; /* evenly space the product items */
  margin-top: 40px;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* distribute space between the title and the price+button */
}

.price-button-group p {
  margin-bottom: 10px; /* Adjust this value as needed */
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
  height: 290px; /* Adjust this if needed, depending on your image sizes and preferred layout */
  display: flex;
  transition: transform 0.2s, box-shadow 0.2s;
  flex-direction: column;
}
.product:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.product-image-container {
  height: 150px; /* Set a fixed height for the images */
  display: flex;
  align-items: center; /* This centers the image vertically */
  justify-content: center; /* This centers the image horizontally */
  overflow: hidden; /* This ensures larger images don't spill over */
  margin-bottom: 10px;
}

.product h2 {
  font-size: 18px;
  margin-bottom: 10px;
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
  margin-top: auto;
}

.add-to-cart-button:hover {
  background-color: #333;
}

.product-image {
  max-height: 100%; /* Ensures the image doesn't exceed its container height */
  width: auto;
}
</style>
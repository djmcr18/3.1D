<template>
  <div class="content-container">
    <div class="intro-section">
      <h1>Foopy Store Catalogue</h1>
      <h3>Best prices guaranteed! Add items to your wishlist so next time you visit us you'll know exactly what you want!</h3>
    </div>
    <div class="product-list">
      <div v-for="(product, index) in products" :key="index" class="product">
        <div class="product-image-container">
          <img :src="`/img/${product.image}`" alt="Product Image" class="product-image">
        </div>
        <div class="product-info">
          <h2>{{ product.name }}</h2>
          <div class="price-button-group">
            <p>Price: ${{ product.price }}</p>
            <button @click="addItemToCart(product)" class="add-to-cart-button">Add to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <teleport to="#modal-target">
    <transition name="fadeUp">
      <div v-if="showModal" class="modal">
        <div class="modal-header">
          <h3>Item Added!</h3>
          <button @click="showModal = false" class="close-btn">×</button>
        </div>
        <div class="item-details">
          <img :src="`/img/${addedItem.image}`" alt="Added Item Image" class="added-item-img">
          <div class="added-item-info">
            <p class="added-item-name">{{ addedItem.name }}</p>
            <p class="added-item-price">Price: ${{ addedItem.price }}</p>
          </div>
        </div>
      </div>
    </transition>
  </teleport>

</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import products from '/public/products.json';

const store = useStore();
let showModal = ref(false);
let addedItem = ref(null);
let timeoutID = ref(null);

const addItemToCart = (item) => {
  store.commit('addToCart', item);
  addedItem.value = item;
  showModal.value = true;

  // Clear the previous timeout
  if (timeoutID.value) {
    clearTimeout(timeoutID.value);
  }

  // Set a new timeout
  timeoutID.value = setTimeout(() => {
    showModal.value = false;
  }, 2000);
};
</script>
  
<style scoped>

.intro-section {
  border-bottom: 2px solid #ddd;
  padding-bottom: 15px;
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
  transition: transform 0.3s, box-shadow 0.3s;
  flex-direction: column;
}
.product:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
}

.product-image-container {
  height: 150px; /* Set a fixed height for the images */
  display: flex;
  align-items: center; /* This centers the image vertically */
  justify-content: center; /* This centers the image horizontally */
  overflow: hidden; /* This ensures larger images don't spill over */
  margin-bottom: 15px;
}

.product h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.add-to-cart-button {
  background-color: #4CAF50;
  color: white;
  border: 2px solid #4CAF50;;
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  text-align: left;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
  font-family: 'Arial', sans-serif;
}

.modal-header {
  background-color: #333;
  color: #fff;
  padding: 0px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}

.item-details {
  display: flex;
  align-items: center;
  gap: 15px; /* space between image and item details */
  padding: 10px 15px;
}

.added-item-img {
  width: 70px;
  border-radius: 5px;
}

.added-item-info {
  flex-grow: 1;
}

.added-item-name {
  font-size: 16px;
  font-weight: bold;
}

.added-item-price {
  color: #333;
  font-weight: bold;
  margin-top: 5px;
}

/* Fade and slide transition */
.fadeUp-enter-active, .fadeUp-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fadeUp-enter-from, .fadeUp-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fadeUp-enter-to, .fadeUp-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive Styles */
@media (max-width: 638px) { /* Tablets and mobile devices */
    .product-list {
        flex-direction: column; /* Stack products vertically on smaller screens */
        align-items: center;
    }
    
    .intro-section h1 {
        font-size: 24px;
    }

    .intro-section h3 {
        font-size: 16px;
    }

    .product {
        width: 90%; /* Make products take up more width on smaller screens */
    }
}

@media (max-width: 480px) { /* Smaller mobile devices */
    .product h2 {
        font-size: 16px;
    }

    .add-to-cart-button {
        padding: 6px 12px;
        font-size: 12px;
    }
}
</style>
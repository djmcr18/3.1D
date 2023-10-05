<template>
  <div class="content-container">
    <div class="intro-section">
      <h1>Your Wishlist</h1>
    </div>
    <div v-show="cart.length === 0" style="font-size: 1.3rem; font-weight: bold; text-align: center; margin: 20px 0;">Your cart is empty</div>
    <br>
    <div v-show="cart.length > 0" class="cart-items">
      <transition-group name="cart-item-fade" tag="div">
        <div v-for="cartItem in cartItems" :key="cartItem.product.id" class="cart-item">
        <img :src="`/img/${cartItem.product.image}`" alt="Product Image" class="product-image">
        <div class="item-details">
          <div class="item-name">{{ cartItem.product.name }}</div>
          <div class="item-price">Price: ${{ cartItem.product.price }}</div>
          <div class="quantity-controls">
            <button @click="decrementQuantity(cartItem.product)" class="quantity-button">-</button>
            <span>{{ cartItem.quantity }}</span>
            <button @click="incrementQuantity(cartItem.product)" class="quantity-button">+</button>
          </div>
          <button @click="removeAllFromCart(cartItem.product)" class="remove-button">Remove All</button>
        </div>
      </div>
    </transition-group>
      <div class="checkout-section">
        <div class="cart-total">
          Total: ${{ cartTotal.toFixed(2) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Getting state and mutations from Vuex store
const cart = computed(() => store.state.cart);

// cartItems computed property
const cartItems = computed(() => {
  const cartItemMap = {};

  cart.value.forEach((product) => {
    if (!cartItemMap[product.id]) {
      cartItemMap[product.id] = { product, quantity: 0 };
    }
    cartItemMap[product.id].quantity += 1;
  });

  // Convert the cartItemMap object into an array and sort it by product id
  return Object.values(cartItemMap).sort((a, b) => a.product.id - b.product.id);
});

// cartTotal computed property
const cartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.product.price * item.quantity, 0);
});

// Mapping mutations from Vuex store
const decrementCartItem = product => store.commit('decrementCartItem', product);
const removeAllFromCart = product => store.commit('removeAllFromCart', product);
const addToCart = product => store.commit('addToCart', product);

// Additional methods
const decrementQuantity = product => decrementCartItem(product);
const incrementQuantity = product => addToCart(product);
</script>


<style scoped>

.intro-section {
  border-bottom: 2px solid #ddd;
  padding-bottom: 15px;
}
.cart-item {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 15px auto; /* Centering the cart items with 'auto' margins on left and right */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box; /* Ensuring padding and border are included in the total width */
}

.product-image {
  max-width: 120px;
  height: auto;
  margin-right: 10px;
  flex-shrink: 0; /* Prevents the image from shrinking */
}

.item-details {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between; /* Distribute space evenly between the child elements */
  width: 100%;
}


.item-name {
  flex-grow: 1;
  font-size: 18px;
  margin-right: 10px;
}

.item-price {
  font-size: 16px;
  margin-right: 50px;
}

.quantity-controls {
  display: flex;
  align-items: center;
}

.quantity-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  margin: 15px;
  transition: background-color 0.3s ease;
}

.quantity-button:hover {
  background-color: #333;
}

.remove-button {
  background-color: #ff5722;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 30px;
  margin-right: 30px;
}

.remove-button:hover {
  background-color: #e41c00;
}

.cart-total {
  font-size: 24px;
  font-weight: bold;
  margin-top: 30px;
  padding: 20px;
  background-color: #f7f7f7;
  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
  text-align: center;
}

.checkout-section {
  margin-top: 20px;
}

.checkout-button {
  display: block;
  width: 100%;
  padding: 15px;
  margin-top: 15px;
  background-color: #007bff;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.checkout-button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .content-container {
    padding: 0 60px; /* Add some padding to the left and right for better margins on small screens */
  }

  .cart-item {
    flex-direction: column; /* Stack items vertically and center content within each item */
    text-align: center;
    align-items: center;
    padding: 20px;
  }

  .product-image {
    width: calc(100% - 30px); /* 100% of the container width minus 30px for some space */
    max-width: 150px; /* Ensures the width doesn't exceed 150px */
    margin-bottom: 15px; /* Adds some space below the image */
  }
  .item-details {
    width: 100%; /* Take up the full width */
    flex-direction: column; /* Align item details vertically */
    align-items: center; /* Center align items for a better look */
    margin-bottom: 10px; /* Adds some space below the item details */
  }

  .item-name, .item-price, .quantity-controls {
    margin: 10px 0; /* Adds vertical spacing between these elements */
  }

  .quantity-controls {
    justify-content: center; /* Center the +, -, and quantity display horizontally */
  }

  .remove-button {
    margin-left: 0;
    margin-right: 0;
    margin: 0px 0; /* Adjust the margin to accommodate the vertical layout */
  }
}

.cart-item-fade-enter-active, .cart-item-fade-leave-active {
  transition: all 0.5s;
}
.cart-item-fade-enter, .cart-item-fade-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.5);
}

@media (max-width: 480px) { /* Mobile devices */
  .item-name {
    font-size: 16px; /* Reduce the font size slightly */
  }

  .item-price {
    font-size: 14px; /* Reduce the font size slightly */
  }

  .quantity-button, .remove-button {
    padding: 5px 10px; /* Reduce padding to fit smaller screens */
    font-size: 12px; /* Reduce font size for a neater look */
  }

  .cart-total {
    font-size: 20px; /* Adjust font size for cart total */
  }

  .checkout-button {
    font-size: 16px; /* Adjust font size for the checkout button */
    padding: 12px; /* Reduce padding slightly */
  }
}

</style>
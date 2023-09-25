<!-- components/ShoppingCart.vue -->

<template>
    <div class="shopping-cart">
      <h1 class="cart-title">Your Shopping Cart</h1>
      <div v-if="cart.length === 0" class="empty-cart">Your cart is empty</div>
      <div v-else class="cart-items">
        <div v-for="(cartItem, store) in cartItems" :key="store" class="cart-item">
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
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapMutations } from 'vuex';
  
  export default {
    computed: {
      ...mapState(['cart']),
      cartItems() {
        // Create a new array of cart items with updated quantities
        const cartItems = [];
        const cartItemMap = new Map();
  
        // First, build a map to track items by their unique product id
        this.cart.forEach((product) => {
          const productId = product.id;
          if (cartItemMap.has(productId)) {
            cartItemMap.get(productId).quantity += 1;
          } else {
            cartItemMap.set(productId, { product, quantity: 1 });
          }
        });
  
        // Then, populate the cartItems array based on the map
        cartItemMap.forEach((cartItem) => {
          cartItems.push(cartItem);
        });
  
        return cartItems;
      },
    },
    methods: {
      ...mapMutations(['removeFromCart', 'decrementCartItem', 'removeAllFromCart', 'addToCart']),
      decrementQuantity(product) {
        this.decrementCartItem(product);
      },
  
      incrementQuantity(product) {
        this.addToCart(product);
      },
    },
  };
  </script>
  
  <style scoped>
  /* components/ShoppingCart.vue scoped styles */  
  .product-image {
    max-width: 100px;
    height: auto;
    margin-right: 10px;
  }
  
  .item-details {
    display: flex;
    flex-grow: 1;
    align-items: center;
  }
  
  .item-name {
    flex-grow: 1; /* Allow item name to expand to fill available space */
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

  .shopping-cart {
  text-align: center; /* Center the entire shopping cart */
  padding: 20px;
}

.cart-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the cart items vertically */
}

.cart-item {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%; /* Use most of the width of the screen */
}

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column; /* Stack items vertically on narrow screens */
    text-align: center; /* Center content within each item */
  }

  .quantity-controls {
    margin-top: 10px; /* Add some spacing between quantity controls and product details */
  }

  .remove-button {
    margin: 10px; /* Adjust the margin to keep the button within the container */
  }
}

  </style>
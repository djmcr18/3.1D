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
      <div class="checkout-section">
        <div class="cart-total">
          Total: ${{ cartTotal.toFixed(2) }}
        </div>
        <button class="checkout-button">Proceed to Checkout</button>
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
      const cartItemMap = {};

      this.cart.forEach((product) => {
        if (!cartItemMap[product.id]) {
          cartItemMap[product.id] = { product, quantity: 0 };
        }
        cartItemMap[product.id].quantity += 1;
      });

      // Convert the cartItemMap object into an array and sort it by product id
      const cartItems = Object.values(cartItemMap).sort((a, b) => a.product.id - b.product.id);

      return cartItems;
    },
    cartTotal() {
      return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
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
.shopping-cart {
  background-color: #f9f9f9;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.cart-title {
  font-size: 28px;
  margin-bottom: 30px;
  color: #333;
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
  margin: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.product-image {
  max-width: 120px;
  height: auto;
  margin-right: 10px;
}

.item-details {
  display: flex;
  flex-grow: 1;
  align-items: center;
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
  .cart-item {
    flex-direction: column; /* Stack items vertically */
    text-align: center; /* Center content within each item */
    align-items: center; /* Center items horizontally */
    padding: 20px;
  }

  .product-image {
    max-width: 170px;
    margin-bottom: 10px; /* Adds some space below the image */
  }

  .item-details {
    width: 100%; /* Take up the full width */
    margin-bottom: 10px; /* Adds some space below the item details */
  }

  .item-name, .item-price, .quantity-controls, .remove-button {
    margin: 10px 0; /* Adds vertical spacing between these elements */
  }
  
  .quantity-controls {
    justify-content: center; /* Center the +, -, and quantity display horizontally */
  }
  
  .remove-button {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>


<template>
    <div class="login-container">
      <h2>Login to Foopy</h2>

      <div v-if="fromForums" class="alert">
        Login required for access to forums.
      </div>
  
      <form @submit.prevent="loginUser">
          <label for="loginEmail">Email:</label>
          <input type="email" id="loginEmail" v-model="loginEmail" v-auto-focus>
  
          <label for="loginPassword">Password:</label>
          <input type="password" id="loginPassword" v-model="loginPassword">
  
          <input type="submit" value="Login">
      </form>
  
      <div v-if="showModal" class="modal" @click="closeModal">
          <div class="modal-content" @click.stop>
              <span @click="closeModal" class="close-button">&times;</span>
              <p :class="messageType">{{ message }}</p>
          </div>
      </div>
    </div>
  </template>
  
<script setup>
import { ref, computed } from 'vue';
import { auth, signInWithEmailAndPassword } from "../firebase.js";
import { useRouter, useRoute } from 'vue-router';

const loginEmail = ref("");
const loginPassword = ref("");
const message = ref("");
const messageType = ref("");
const showModal = ref(false);
const router = useRouter();
const route = useRoute();

const loginUser = async () => {
    try {
        await signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value);
        message.value = "Login successful!";
        messageType.value = "success";
        showModal.value = true;

        setTimeout(() => {
            router.push('/');  // redirect to home page
        }, 1000); // 1000 milliseconds = 1 second

    } catch (error) {
        console.error("Login error:", error);
        message.value = "Login failed. Please check your email and password.";;
        messageType.value = "error";
        showModal.value = true;
    }
};

const closeModal = () => {
    showModal.value = false;
    message.value = "";
};

const fromForums = computed(() => route.query.from === 'Forums');
</script>
  
<style scoped>

h2 {
    text-align: center;
    margin-bottom: 40px;
}

form {
    max-width: 550px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}

input[type="email"], input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box; /* Ensures padding doesn't add to the width */
}

input[type="submit"] {
    background-color: #333;
    color: #fff;
    padding: 10px 15px;
    font-size: 18px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    width: 100%;
    transition: background-color 0.3s;
}

.login-container {
  margin-top: 67.5px;
  margin-bottom: 40px;  /* Adjust as needed */
}

input[type="submit"]:hover {
    background-color: #555;
}

.message {
    font-size: 18px;
    text-align: center;
    margin: 20px 0;
}

.success {
    color: green;
    font-weight: bold;
}

.error {
    color: red;
    font-weight: bold;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}

.modal-content {
  position: relative;
  background-color: #fff;
  padding: 40px;  /* Increased padding */
  border-radius: 10px; /* Smoother borders */
  width: 80%; /* Wider modal */
  max-width: 600px; /* Increased max width */
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); /* Added shadow */
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 24px;
    background-color: rgba(0, 0, 0, 0.6); /* Dark semi-transparent background */
    color: #fff;  /* White text color */
    border-radius: 50%;  /* Circle shape */
    width: 30px;  /* Fixed width */
    height: 30px;  /* Fixed height */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);  /* Add a subtle shadow */
}

.close-button:hover {
    background-color: rgba(0, 0, 0, 0.8);  /* Slightly darker on hover */
}

.alert {
  color: red;
  margin-bottom: 30px;
  font-weight: bold;
  text-align: center;
}
</style>
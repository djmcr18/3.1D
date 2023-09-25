<template>
  <div id="app">
    <!-- Title Header -->
    <header class="title-header">
      <h1 class="site-title">FOOPY</h1>
    </header>

    <!-- Navigation Bar -->
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/foopyfeed">FOOPY NEWS FEED</router-link></li>
        <li><router-link to="/forums">Forums</router-link></li>
        <li><router-link to="/store">Store</router-link></li>
        <li><router-link to="/cart">Shopping Cart</router-link></li>
      </ul>
    </nav>

    <!-- Router View -->
    <router-view></router-view>

    <!-- Footer -->
    <footer>
      <!-- Add footer content here -->
    </footer>
  </div>
</template>

<script>
import { ref } from 'vue';

</script>

<style scoped>
/* Title Header styles */
.title-header {
  background-color: #4CAF50; /* Green background color */
  color: white;
  padding: 10px 0;
  text-align: center;
  font-family: 'CoolFont', sans-serif; /* Apply a cooler font */
  margin-bottom: 20px; /* Separation from the navigation bar */
}

.site-title {
  font-size: 36px; /* Adjust the font size as needed for a cooler look */
  margin: 0; /* Remove margin for the h1 element */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Add a text shadow for a cool effect */
  font-style: italic; /* Make the font italic */
}

/* Navigation Bar styles */
nav {
  background-color: #333;
  color: white;
  padding: 10px 0;
  display: flex;
  justify-content: center; /* Center the navigation links horizontally */
  align-items: center;
  font-family: 'Roboto', sans-serif; /* Use the 'Roboto' font from Google Fonts for the entire website */
}

nav ul {
  list-style: none;
  display: flex;
}

nav li {
  margin-right: 20px;
}

nav a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #4CAF50; /* Green color on hover */
}

/* Main content styles */
main {
  max-width: 100%;
  padding: 20px;
  background-color: #f5f5f5;
  font-family: 'Roboto', sans-serif; /* Apply the 'Roboto' font to the main content */
}

/* Typography */
h1, h2 {
  color: #333;
  font-family: 'Roboto', sans-serif; /* Apply the 'Roboto' font to headings */
}

/* News section styles */
.news {
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

/* Responsive layout */
@media (max-width: 768px) {
  header {
    flex-direction: column;
    text-align: center;
  }

  nav ul {
    margin-top: 10px;
    justify-content: center; /* Center the navigation links vertically */
  }

  nav li {
    margin-right: 0;
    margin-bottom: 10px;
  }

  main {
    padding: 10px;
  }
}
</style>

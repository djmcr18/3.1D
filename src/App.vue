<template>
  <div id="app">
  
    <!-- Account Actions Bar -->
    <div class="actions-bar">
      <div class="account-actions">
        <router-link to="/cart"><i class="fas fa-shopping-cart"></i></router-link>
        <router-link to="/CustomerRegistration">Register</router-link>
      </div>
    </div>

    <!-- Title Header -->
    <header class="title-header">
      <h1 class="site-title">FOOPY</h1>
    </header>

    <!-- Navigation Bar -->
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/foopyfeed">FOOPY NEWS FEED</router-link></li>
        <li><router-link to="/tacticsboard">Tactics Board</router-link></li>
        <li><router-link to="/store">Store</router-link></li>
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

<style scoped>
/* Title Header styles */
.title-header {
  background-color: #4CAF50; /* Green background color */
  color: white;
  padding: 1  0px 0;
  text-align: center;
  font-family: 'CoolFont', sans-serif; /* Apply a cooler font */
  margin-bottom: 20px; /* Separation from the navigation bar */
  margin-top: 30px; /* Adjusted to account for the actions-bar's height + a bit of additional space */
}

.site-title {
  font-size: 36px; /* Adjust the font size as needed for a cooler look */
  margin: 5px; /* Remove margin for the h1 element */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Add a text shadow for a cool effect */
  font-style: italic; /* Make the font italic */
}

/* Navigation Bar styles */
nav {
  background-color: #333;
  color: white;
  padding: 20px 0;  /* Increase padding for thickness */
  display: flex;
  justify-content: center; /* Center the navigation links horizontally */
  align-items: center;
  font-family: 'Roboto', sans-serif; /* Use the 'Roboto' font from Google Fonts for the entire website */
  border-radius: 10px;  /* Curved corners */
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
  padding: 7px;  /* Added padding for a larger clickable area and better visual spacing */
  border-radius: 5px; /* Rounded corners for hover effect */
}

nav a:hover {
  color: #4CAF50; /* Green color on hover */
  background-color: rgba(255, 255, 255, 0.1); /* Subtle hover effect */
}

/* Media query for smaller screens */

@media (max-width: 640px) {
  nav {
    padding: 15px 0;  /* Adjusted padding */
  }
  
  nav ul {
    flex-direction: column; /* stack the links vertically */
    align-items: center;    /* center the links */
  }

  nav li {
    margin: 15px 0;  /* Increased vertical spacing for stacked links */
    width: 100%;     /* Make the li elements span the full width */
    text-align: center; /* Center the text within the li */
  }

  nav a {
    padding: 10px 20px;  /* Added padding for a larger clickable area and better visual spacing */
    border-radius: 5px; /* Rounded corners for hover effect */
  }
  
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

/* Account Actions bar */
.actions-bar {
  background-color: #333;
  padding: 5px 0;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.account-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  max-width: 1200px; /* Adjust according to your site's maximum width */
  margin: 0 auto;
  padding: 0 20px; /* Adding padding to ensure it doesn't stick to the edge */
}

.account-actions a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.account-actions a:hover {
  color: #4CAF50;
}

.fas.fa-shopping-cart {
    font-size: 20px;
}
</style>

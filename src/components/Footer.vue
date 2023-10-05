<template>
    <footer class="foopy-footer">
        <div class="footer-content">
            <!-- Navigation Section -->
            <div class="footer-section">
                <h4>Navigation</h4>
                <ul>
                  <li><router-link to="/"><i class="fas fa-home"></i> Home</router-link></li>
                  <li><router-link to="/foopyfeed"><i class="fas fa-newspaper"></i> News Feed</router-link></li>
                  <li><router-link to="/forums"><i class="fas fa-comments"></i> Forums</router-link></li>
                  <li><router-link to="/tacticsboard"><i class="fas fa-chalkboard"></i> Tactics Board</router-link></li>
                  <li><router-link to="/store"><i class="fas fa-store"></i> Store</router-link></li>
                  <li><router-link to="/cart"><i class="fas fa-shopping-cart"></i> Shopping Cart</router-link></li>
                </ul>
            </div>

            <!-- Contact Info Section -->
            <div class="footer-section">
                <h4>Contact FOOPY</h4>
                <div class="contact-item">
                    <a href="mailto:contact@foopy.com"><i class="fas fa-envelope"></i> contact@foopy.com</a>
                </div>
                <div class="contact-item">
                    <i class="fas fa-phone"></i> 04XX XXX XXX
                </div>
                <div class="contact-item">
                    <i class="fas fa-map-marker-alt"></i> Melbourne, Victoria
                </div>
            </div>

            <!-- Social Media Section -->
            <div class="footer-section">
                <h4>Connect with FOOPY</h4>
                <ul>
                    <li><router-link to="/CustomerRegistration"><i class="fas fa-user-plus"></i> Register</router-link></li>
                    <li><router-link to="/login"><i class="fas fa-sign-in-alt"></i> Login</router-link></li>
                    <li><a href="#" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a></li>
                    <li><a href="#" target="_blank"><i class="fab fa-instagram"></i> Instagram</a></li>
                    <li><a href="#" target="_blank"><i class="fab fa-facebook"></i> Facebook</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2023 FOOPY. All rights reserved.</p>
        </div>
    </footer>
</template>
  
  <style scoped>
.foopy-footer {
    background-color: #fff;
    color: #333;
    padding: 40px;  /* Use padding here to protect the internal content from touching the edges */
    border-top: 1px solid #ddd;
    font-family: 'Arial', sans-serif;
    margin-left: -50px;   /* Adjust according to the parent container's padding */
    margin-right: 0px;  /* Adjust according to the parent container's padding */
    flex-shrink: 0; /* Ensure the footer doesn't shrink */
    width: calc(100% + 100px);  /* Adjust the width to span the full viewport width plus the total of both negative margins */
}
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 5%;
  }
  
  .footer-section {
    flex: 1;
    margin-right: 20px;
    margin-bottom: 10px;  /* Added for consistent spacing */
  }
  
  .footer-section:last-child {
    margin-right: 0;
  }
  
  .footer-section h4 {
    border-bottom: 2px solid #3a8d40;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  
  .footer-section ul {
    list-style-type: none;
    padding-left: 0;
  }
  
  .footer-section li {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .footer-section i {
    margin-right: 10px;
    transition: color 0.3s, transform 0.3s;
  }
  
  .footer-section a {
    color: #000;
    text-decoration: none;
    transition: color 0.3s, transform 0.3s;
  }
  
  .footer-section a:hover,
  .footer-section a:hover i {
    color: #007BFF;
    transform: scale(1.1);
  }
  
  .footer-bottom {
    text-align: center;
    margin-top: 40px;
    border-top: 1px solid #34495e;
    padding-top: 20px;
  }
  
  .contact-item {
    margin-bottom: 15px;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
  }
  
  @media (max-width: 768px) {
    .footer-content {
        flex-direction: column;
    }
  
    .footer-section {
        margin-right: 0;
        margin-bottom: 20px;
    }
  
    .footer-section:last-child {
        margin-bottom: 0;
    }
  }
  </style>
  
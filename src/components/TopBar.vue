<template>
    <div id="bars" :style="{ transform: `translateY(${topBarOffset}px)` }">
        <!-- Account Actions Bar -->
        <!-- Account Actions Bar -->
        <div v-if="toastMessage" class="toast-notification">{{ toastMessage }}</div>
        <div class="actions-bar">
            <div class="account-actions">
                <!-- If data is loaded and username is available, display greeting -->
                <span v-if="isDataLoaded && username" class="greeting">Hi, {{ username }}!</span>
                <a v-if="username" @click="logout" class="logout-link">Log Out</a>
                <!-- Conditionally render these links based on whether a user is logged in -->
                <router-link v-if="!isDataLoaded || !username" to="/CustomerRegistration">Register</router-link>
                <router-link v-if="!isDataLoaded || !username" to="/login">Log in</router-link>
                <router-link to="/cart"><i class="fas fa-shopping-cart"></i></router-link>
            </div>
        </div>

        <!-- Title Header -->
        <header class="title-header">
            <h1 class="site-title">
                <!-- Wrap just the text "FOOPY" inside a router-link targeting the homepage -->
                <router-link to="/">FOOPY</router-link>
            </h1>
        </header>

        <!-- Navigation Bar -->
        <div class="nav-container">
            <input type="checkbox" v-model="menuToggle" id="menu-toggle" class="menu-toggle">
            <label for="menu-toggle" class="dropdown-btn">Menu</label>
            <div class="links-container">
                <router-link class="nav-link" to="/" @click="closeMenu">Home</router-link>
                <router-link class="nav-link" to="/foopyfeed" @click="closeMenu">News Feed</router-link>
                <router-link class="nav-link" to="/forums" @click="closeMenu">Forums</router-link>
                <router-link class="nav-link" to="/tacticsboard" @click="closeMenu">Tactics Board</router-link>
                <router-link class="nav-link" to="/store" @click="closeMenu">Store Catalogue</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { auth, db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from 'vue-router';

// Reactive data properties
const topBarOffset = ref(0);
const lastScrollPosition = ref(0);
const maxBarHeight = ref(0);
const username = ref('');
const isDataLoaded = ref(false);
const router = useRouter();
const toastMessage = ref('');


const handleScroll = () => {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const barHeight = maxBarHeight.value;
    const diff = lastScrollPosition.value - currentScrollPosition;

    if (diff > 0) {
        topBarOffset.value += (diff / 2) + 0;
        if (topBarOffset.value > 0) {
            topBarOffset.value = 0;
        }
    } else if (diff < 0) {
        topBarOffset.value -= -diff / 2;
        if (topBarOffset.value < -barHeight) {
            topBarOffset.value = -barHeight;
        }
    }

    lastScrollPosition.value = currentScrollPosition;
};

// Dropdown Menu Control
const menuToggle = ref(false);  // To control the checkbox

// Function to close the menu
const closeMenu = () => {
    menuToggle.value = false;
};

const fetchUsername = async () => {
    if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        try {
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                username.value = userDoc.data().FirstName; // Assuming you have a 'FirstName' field for each user
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }
};

const logout = async () => {
    try {
        await signOut(auth);
        username.value = ''; // Clear the username after logging out
        router.push('/'); // Navigate to the homepage
        toastMessage.value = 'Logged out successfully!'; // Set the toast message
        setTimeout(() => { toastMessage.value = ''; }, 3000); // Clear the toast after 3 seconds
    } catch (error) {
        console.error("Error logging out:", error);
    }
};


onMounted(() => {
    maxBarHeight.value = document.getElementById('bars').offsetHeight;
    window.addEventListener('scroll', handleScroll);
    
    // This sets up an authentication state listener
    auth.onAuthStateChanged(user => {
        if (user) {
            fetchUsername();
            isDataLoaded.value = true;
        } else {
            username.value = ''; // clear the username if logged out
            isDataLoaded.value = false;
        }
    });
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});

</script>

  
<style scoped>
/* General Bar Styling */
#bars {
font-family: 'Arial', sans-serif;
box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
position: fixed;
top: 0;
left: 0;
width: 100%;
z-index: 1000;
background: #F8F8F8; /* Light background for the bar container */
}

.title-header, nav {
transition: transform 0.3s ease-in-out;
}

/* Account Actions Bar */
.actions-bar {
background: #3a8d40; /* Green background */
padding: 7px 0;
display: flex;
justify-content: flex-end;
align-items: center;
}

.account-actions {
padding: 0 20px; 
}

.account-actions a {
color: white;
text-decoration: none;
font-weight: bold;
padding: 5px 10px;
transition: background 0.3s ease;
border-radius: 5px;
}

.account-actions a:hover {
background: rgba(0, 0, 0, 0.1);
}

.fas.fa-shopping-cart {
margin-right: 10px;
transition: transform 0.3s ease;
}

.fas.fa-shopping-cart:hover {
transform: scale(1.1);
}

/* Title Header */
.title-header {
background: #303841; /* Dark shade */
padding: 25px 0;
text-align: center;
animation: gradientShift 10s infinite alternate; /* Gradient animation */
}


@keyframes gradientShift {
0% {
    background: #303841; /* Dark shade */
}
50% {
    background: #3a8d40; /* Green */
}
100% {
    background: #303841; /* Dark shade */
}
}

.site-title {
    font-size: 50px;
    color: white;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Slight shadow for depth */
    animation: titleGlow 2s infinite alternate, float 6s infinite alternate;
}

@keyframes titleGlow {
    0% {
        text-shadow: 2px 2px 15px rgba(255, 255, 255, 1.5); /* Increased glow effect */
    }
    100% {
        text-shadow: 2px 2px 15px rgba(255, 255, 255, 1.5); /* Increased glow effect */
    }
}

@keyframes float {
    0%, 100% {
        transform: translateY(4px);
    }
    50% {
        transform: translateY(-4px);
    }
}

.site-title a, 
.site-title a:hover, 
.site-title a:visited {
    color: white; /* Ensure the color remains consistent with the site-title */
    text-decoration: none; /* Remove underline */
    display: inline-block; /* Ensure it doesn't disrupt the layout */
}


/* Mobile styles */
.menu-toggle {
display: none; /* hide the checkbox */
}

/* Navigation Container */
.nav-container {
background: rgba(255, 255, 255, 0.95); /* Semi-transparent white */
padding: 10px 0;
display: flex;
justify-content: center;
align-items: center;
position: relative; /* This will allow dropdown to position properly */
width: 100%;
}

/* Dropdown Button */
.dropdown-btn {
font-family: 'Arial', sans-serif;
background-color: #F8F8F8;
color: #303841; /* Dark shade */
padding: 10px 20px;
border: none;
cursor: pointer;
border-radius: 5px;
display: none; /* Initially hide on larger screens */
transition: all 0.3s ease;
}

.dropdown-btn:hover {
background-color: #e8e8e8;
}

/* Navigation Links */
.links-container {
display: flex;
list-style-type: none;
padding: 0;
}

.links-container .nav-link {
text-decoration: none;
color: #303841; /* Dark shade */
font-weight: bold;
padding: 5px 10px;
margin: 0 15px;
transition: all 0.3s ease;
border-radius: 5px;
}

.links-container .nav-link:hover {
color: #3a8d40; /* Green on hover */
background: rgba(58, 141, 64, 0.1); /* Slight green background on hover */
transform: translateY(-3px); /* Gentle lift effect on hover */
}

/* Responsive Breakpoint */
@media (max-width: 768px) {
.dropdown-btn {
    display: block;
}

.links-container {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
    z-index: 1001;
}

.menu-toggle:checked + .dropdown-btn + .links-container {
    display: flex;
}

.links-container .nav-link {
    margin: 0;
    padding: 10px;
    text-align: center;
    border-top: 1px solid #e7e7e7;
}

.links-container .nav-link:first-child {
    border-top: none;
}
}

/* Greeting styling */
.greeting {
    color: white;
    text-decoration: none;
    font-weight: bold;
    padding: 5px 10px;
    transition: background 0.3s ease;
    border-radius: 5px;
}

/* Logout link styling to make it look like the other action bar links */
.logout-link {
    color: white;
    text-decoration: none;
    font-weight: bold;
    padding: 5px 10px;
    transition: background 0.3s ease;
    border-radius: 5px;
    cursor: pointer;
}

.logout-link:hover {
    background: rgba(0, 0, 0, 0.1);
}

.toast-notification {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: bold;
    z-index: 2000; /* make sure it appears above other elements */
    transition: bottom 0.5s ease;
}

.toast-notification:hover {
    bottom: 25px; /* little animation for interaction */
}

</style>

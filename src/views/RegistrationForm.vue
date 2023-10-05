<template>
    <div class="registration-container">
        <br><br><br><br>

        <h2>Foopy Member Registration</h2>
        <form @submit.prevent="registerUser">
            <label for="FirstName">First Name:</label>
            <input type="text" id="FirstName" v-model="FirstName" v-auto-focus>
            
            <label for="LastName">Last Name:</label>
            <input type="text" id="LastName" v-model="LastName">
            
            <label for="Email">Email:</label>
            <input type="email" id="Email" v-model="Email">

            <label for="Password">Password:</label>
            <input type="password" id="Password" v-model="Password">

            <div class="phone-label">
            <label for="Phone">Phone Number:</label>
            <i class="fas fa-lightbulb" v-tooltip="'Enter in the format: +61 XXX XXX XXX (no spaces)'"></i>
            </div>
            <input type="tel" id="Phone" v-model="PhoneNumber" placeholder="+61 123456789">
            <label for="Address">Address:</label>
            <textarea id="Address" v-model="Address" rows="4"></textarea>
            
            <input type="submit" value="Register">
        </form>
    </div>

    <teleport to="body">
        <div v-if="showModal" class="modal" @click="closeModal">
            <div class="modal-content" @click.stop>
                <span @click="closeModal" class="close-button">&times;</span>
                <p :class="messageType">{{ message }}</p>
            </div>
        </div>
    </teleport>


</template>

<script setup>
import { ref, onMounted } from 'vue';
import { auth, createUserWithEmailAndPassword, db } from "../firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from 'vue-router';

const FirstName = ref("");
const LastName = ref("");
const Email = ref("");
const Password = ref("");
const PhoneNumber = ref("");
const Address = ref("");
const message = ref("");
const messageType = ref("error");
const showModal = ref(false);
const router = useRouter();

const registerUser = async () => {
    // Input validation checks for all fields
    if (!FirstName.value || !LastName.value || !Email.value || !Password.value || !PhoneNumber.value || !Address.value) {
        message.value = "Please fill in all required fields.";
        messageType.value = "error";
        showModal.value = true;
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, Email.value, Password.value);
        const user = userCredential.user;

        // Save additional user details in Firestore
        await saveUserInFirestore(user.uid);

        console.log('User registered:', user);

        // Sign out the user immediately after registration
        await signOut(auth);

        // Update feedback message
        message.value = "Successfully registered! Please log in.";
        messageType.value = "success";
        showModal.value = true;

        // Wait for 2 seconds then redirect to login
        setTimeout(() => {
            closeModal();
            router.push('/login'); // Redirects to the login page
        }, 2000);  // 2000 milliseconds = 2 seconds

    } catch (error) {
        console.error('Error registering user:', error);

        if (error.code === "auth/email-already-in-use") {
            message.value = "Email is already in use. Please use another email or log in.";
        } else if (error.code === "auth/invalid-email") {
            message.value = "The email address is not valid.";
        } else if (error.code === "auth/weak-password") {
            message.value = "Password is too weak. Please choose a stronger password.";
        } else {
            message.value = "An error occurred during registration. Make sure all input fields are filled.";
        }
        messageType.value = "error";
        showModal.value = true;
    }
};

const saveUserInFirestore = async (userId) => {
    try {
        const userRef = doc(db, "users", userId);
        await setDoc(userRef, {
            FirstName: FirstName.value,
            LastName: LastName.value,
            Email: Email.value,
            PhoneNumber: PhoneNumber.value,
            Address: Address.value
        });
    } catch (error) {
        console.error('Error saving user details in Firestore:', error);
    }
};

const closeModal = () => {
    showModal.value = false;
    message.value = "";  // Clear the message when the modal is closed
};
</script>



<style scoped>

h2 {
    text-align: center;
    margin-bottom: 40px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}

form {
    max-width: 600px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

input[type="text"], input[type="email"], input[type="tel"], input[type="password"], textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
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

input[type="submit"]:hover {
    background-color: #555;
}

.registration-container {
  margin-bottom: 40px;  /* Adjust as needed */
}

.phone-label {
  display: flex;
}

.phone-label i.fas.fa-lightbulb {
    margin-left: 10px; /* Adjust the value as needed */
}

@media screen and (max-width: 640px) {
    body {
        padding: 20px;
    }
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.success {
    color: green;
    font-weight: bold;
}

.error {
    color: red;
    font-weight: bold;
}

.fas.fa-lightbulb {
    color: rgb(241, 205, 0); /* Make the lightbulb yellow */
    transition: transform 0.3s ease; /* Smooth transition for hover effect */
}

.fas.fa-lightbulb:hover {
    transform: scale(1.3); /* Enlarge the icon a bit on hover */
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

</style>

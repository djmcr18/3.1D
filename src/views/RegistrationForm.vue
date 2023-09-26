<template>
    <div>
        <br><br>
        <!-- Message from Vue with dynamic class binding -->
        <div class="message" :class="messageType">{{ message }}</div>

        <h2>Foopy Member Registration</h2>
        <form @submit.prevent="submitForm">
            <label for="FirstName">First Name:</label>
            <input type="text" id="FirstName" v-model="FirstName">
            
            <label for="LastName">Last Name:</label>
            <input type="text" id="LastName" v-model="LastName">
            
            <label for="Email">Email:</label>
            <input type="email" id="Email" v-model="Email">
            
            <label for="Phone">Phone Number (Format: +61 ):</label>
            <input type="tel" id="Phone" v-model="PhoneNumber" placeholder="+61 123456789">
            
            <label for="Address">Address:</label>
            <textarea id="Address" v-model="Address" rows="4"></textarea>
            
            <input type="submit" value="Register">
        </form>
        <footer style="text-align: center; margin-top: 50px; font-size: 14px;">
            <br>
            <p>Designed by Diego Miranda Ciudad Real</p>
        </footer>
    </div>
</template>

<script>

export default {

    data() {
        return {
            FirstName: "",
            LastName: "",
            Email: "",
            PhoneNumber: "",
            Address: "",
            message: "",
            messageType: "error"
        };
    },
    methods: {
        async submitForm() {
            if (!this.FirstName || !this.LastName || !this.Email || !this.PhoneNumber || !this.Address) {
                this.message = "All fields are mandatory.";
                this.messageType = "error";
                return;
            }

            const formData = {
                FirstName: this.FirstName,
                LastName: this.LastName,
                Email: this.Email,
                PhoneNumber: this.PhoneNumber,
                Address: this.Address
            };

            try {
                const response = await fetch("http://localhost/FoopyBackend/RegisterCustomer.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (data.success) {
                    this.message = "Registration successful!";
                    this.messageType = "success";
                } else {
                    this.message = data.message;
                    this.messageType = "error";
                }
            } catch (error) {
                this.message = "An error occurred.";
                this.messageType = "error";
            }
        }
    }
};
</script>

<style>
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    padding: 50px;
}

h2 {
    text-align: center;
    margin-bottom: 40px;
}

form {
    max-width: 600px;
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

input[type="text"], input[type="email"], input[type="tel"], textarea {
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
</style>

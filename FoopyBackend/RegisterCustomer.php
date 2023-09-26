<!-- File location note -->
<!-- This file is located within the XAMPP/htdocs/FoopyBackend folder. It must be located in that folder in order for the PHP code to -->
<!-- work with XAMPP's Apache Web Server. -->
<!-- The RegistrationForm.vue fetches this php file from the htdocs folder. -->

<?php

// Setting headers for proper communication and handling CORS (Cross-Origin Resource Sharing) issues.
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Enabling error reporting for debugging purposes
error_reporting(E_ALL); 
ini_set('display_errors', 1);

// Database connection details
$servername = "127.0.0.1"; 
$username = "root"; 
$password = ""; 
$dbname = "Foopy";

// Initiating the connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check if the connection is successful, if not return an error message
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// Retrieving data sent to the PHP file
$data = json_decode(file_get_contents("php://input"));

// Assigning data to variables for easier use
$FirstName = $data->FirstName;
$LastName = $data->LastName;
$Email = $data->Email;
$PhoneNumber = $data->PhoneNumber;
$Address = $data->Address;

// Array to hold validation errors
$errors = [];

// Checking if any of the fields are empty
if (empty($FirstName) || empty($LastName) || empty($Email) || empty($PhoneNumber) || empty($Address)) {
    $errors[] = "All fields are mandatory!";
} else {
    // Validating the email format
    if (!filter_var($Email, FILTER_VALIDATE_EMAIL)) { 
        $errors[] = "Invalid Email Format!";
    }
    // Validating the phone number format
    if (!preg_match("/\+61[0-9]{8,10}/", $PhoneNumber)) {
        $errors[] = "Invalid Phone Number! Format should be: +61 followed by 8 to 10 digits.";
    }
}

// If there are no validation errors, insert data into the database
if (count($errors) == 0) {
    $stmt = $conn->prepare("INSERT INTO CUSTOMER (FirstName, LastName, Email, PhoneNumber, Address) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $FirstName, $LastName, $Email, $PhoneNumber, $Address);

    // Check if the insertion was successful and return appropriate message
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Account creation successful!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error occurred while inserting data."]);
    }
} else {
    // If there were validation errors, return them
    echo json_encode(["success" => false, "message" => implode(", ", $errors)]);
}

// Closing the database connection
$conn->close();

?>
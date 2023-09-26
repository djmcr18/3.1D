<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

error_reporting(E_ALL); 
ini_set('display_errors', 1);

$servername = "127.0.0.1"; 
$username = "root"; 
$password = ""; 
$dbname = "Foopy";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"));

$FirstName = $data->FirstName;
$LastName = $data->LastName;
$Email = $data->Email;
$PhoneNumber = $data->PhoneNumber;
$Address = $data->Address;

$errors = [];

if (empty($FirstName) || empty($LastName) || empty($Email) || empty($PhoneNumber) || empty($Address)) {
    $errors[] = "All fields are mandatory!";
} else {
    if (!filter_var($Email, FILTER_VALIDATE_EMAIL)) { 
        $errors[] = "Invalid Email Format!";
    }
    if (!preg_match("/\+61[0-9]{8,10}/", $PhoneNumber)) {
        $errors[] = "Invalid Phone Number! Format should be: +61 followed by 8 to 10 digits.";
    }
}

if (count($errors) == 0) {
    $stmt = $conn->prepare("INSERT INTO CUSTOMER (FirstName, LastName, Email, PhoneNumber, Address) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $FirstName, $LastName, $Email, $PhoneNumber, $Address);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Account creation successful!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error occurred while inserting data."]);
    }
} else {
    echo json_encode(["success" => false, "message" => implode(", ", $errors)]);
}

$conn->close();
?>

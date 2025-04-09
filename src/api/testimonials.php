
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database configuration
$servername = "localhost";
$username = "root"; // Change to your database username
$password = ""; // Change to your database password
$dbname = "testimonials_db"; // Change to your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Handle request based on method
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get all testimonials
        $sql = "SELECT * FROM testimonials ORDER BY created_at DESC";
        $result = $conn->query($sql);
        
        if ($result) {
            $testimonials = array();
            while ($row = $result->fetch_assoc()) {
                $testimonials[] = $row;
            }
            echo json_encode(["success" => true, "data" => $testimonials]);
        } else {
            echo json_encode(["success" => false, "error" => "Error fetching testimonials: " . $conn->error]);
        }
        break;
        
    case 'POST':
        // Add new testimonial
        $data = json_decode(file_get_contents("php://input"), true);
        
        if (isset($_FILES['image'])) {
            // Handle file upload
            $target_dir = "../uploads/";
            if (!file_exists($target_dir)) {
                mkdir($target_dir, 0777, true);
            }
            
            $target_file = $target_dir . time() . "_" . basename($_FILES["image"]["name"]);
            $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
            
            // Check file type
            if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
                echo json_encode(["success" => false, "error" => "Sorry, only JPG, JPEG, PNG files are allowed"]);
                exit();
            }
            
            if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
                $image_url = "uploads/" . basename($target_file);
            } else {
                echo json_encode(["success" => false, "error" => "Error uploading file"]);
                exit();
            }
        } else {
            $image_url = "";
        }
        
        $name = isset($_POST['name']) ? $_POST['name'] : $data['name'];
        $text = isset($_POST['text']) ? $_POST['text'] : $data['text'];
        $user_id = isset($_POST['userId']) ? $_POST['userId'] : $data['userId'];
        
        // Check if user has already submitted a testimonial
        $check_sql = "SELECT id FROM testimonials WHERE user_id = ?";
        $check_stmt = $conn->prepare($check_sql);
        $check_stmt->bind_param("s", $user_id);
        $check_stmt->execute();
        $check_result = $check_stmt->get_result();
        
        if ($check_result->num_rows > 0) {
            echo json_encode(["success" => false, "error" => "You have already submitted a testimonial"]);
            exit();
        }
        
        // Insert testimonial
        $sql = "INSERT INTO testimonials (name, text, image_url, user_id, created_at) VALUES (?, ?, ?, ?, NOW())";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $name, $text, $image_url, $user_id);
        
        if ($stmt->execute()) {
            echo json_encode([
                "success" => true, 
                "message" => "Testimonial added successfully",
                "data" => [
                    "id" => $stmt->insert_id,
                    "name" => $name,
                    "text" => $text,
                    "image_url" => $image_url,
                    "user_id" => $user_id
                ]
            ]);
        } else {
            echo json_encode(["success" => false, "error" => "Error adding testimonial: " . $stmt->error]);
        }
        break;
        
    default:
        echo json_encode(["success" => false, "error" => "Invalid request method"]);
        break;
}

$conn->close();
?>

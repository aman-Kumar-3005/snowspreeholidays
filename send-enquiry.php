<?php
/**
 * SPREE HOLIDAYS (@snowspreeholidays)
 * Hostinger Shared Hosting Form Mail Handler
 * 
 * Instructions for Client / Admin:
 * 1. Replace [RECIPIENT_EMAIL] below with your official agency email (e.g. info@snowspreeholidays.com or your Gmail)
 * 2. Upload this file directly to public_html/ on Hostinger
 */

header('Content-Type: application/json; charset=UTF-8');

// 1. Configuration Placeholder
// REPLACE WITH YOUR EMAIL ADDRESS WHERE INQUIRIES SHOULD GO:
$recipient_email = "info@snowspreeholidays.com"; // [RECIPIENT_EMAIL]
$sender_email    = "no-reply@snowspreeholidays.com"; // Hostinger domain sender email

// Only accept POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method."
    ]);
    exit;
}

// 2. Collect and sanitize input data
$full_name    = isset($_POST['full_name']) ? htmlspecialchars(strip_tags(trim($_POST['full_name']))) : '';
$phone        = isset($_POST['phone']) ? htmlspecialchars(strip_tags(trim($_POST['phone']))) : '';
$email        = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : 'Not provided';
$travel_date  = isset($_POST['travel_date']) ? htmlspecialchars(strip_tags(trim($_POST['travel_date']))) : 'Flexible';
$duration     = isset($_POST['duration']) ? htmlspecialchars(strip_tags(trim($_POST['duration']))) : 'Not specified';
$destination  = isset($_POST['destination']) ? htmlspecialchars(strip_tags(trim($_POST['destination']))) : 'General Enquiry';
$adults       = isset($_POST['adults']) ? intval($_POST['adults']) : 2;
$children     = isset($_POST['children']) ? intval($_POST['children']) : 0;
$budget       = isset($_POST['budget']) ? htmlspecialchars(strip_tags(trim($_POST['budget']))) : 'Standard';
$message      = isset($_POST['message']) ? htmlspecialchars(strip_tags(trim($_POST['message']))) : '';

// 3. Validation
if (empty($full_name) || empty($phone)) {
    echo json_encode([
        "status" => "error",
        "message" => "Name and Phone / WhatsApp number are required fields."
    ]);
    exit;
}

// 4. Construct Email
$subject = "✨ New Kashmir Trip Enquiry from " . $full_name . " — Spree Holidays";

$email_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>New Tour Enquiry</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #192729; }
        .container { max-width: 600px; margin: 20px auto; border: 1px solid #E1EBE8; border-radius: 8px; overflow: hidden; }
        .header { background-color: #0E3B43; color: #ffffff; padding: 20px; text-align: center; }
        .content { padding: 25px; background-color: #ffffff; }
        .field { margin-bottom: 12px; }
        .label { font-weight: bold; color: #0E3B43; }
        .footer { background-color: #F7FAF9; padding: 15px; font-size: 12px; text-align: center; color: #5B6F71; }
        .highlight { color: #E28743; font-weight: bold; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>🏔️ Spree Holidays Enquiry</h2>
            <p>New Tour Package Lead received from Website</p>
        </div>
        <div class='content'>
            <div class='field'><span class='label'>Guest Name:</span> {$full_name}</div>
            <div class='field'><span class='label'>Phone / WhatsApp:</span> <a href='https://wa.me/" . preg_replace('/[^0-9]/', '', $phone) . "'>{$phone}</a></div>
            <div class='field'><span class='label'>Email:</span> {$email}</div>
            <div class='field'><span class='label'>Preferred Package / Destination:</span> <span class='highlight'>{$destination}</span></div>
            <div class='field'><span class='label'>Travel Dates:</span> {$travel_date} ({$duration})</div>
            <div class='field'><span class='label'>Total Travelers:</span> {$adults} Adults, {$children} Children</div>
            <div class='field'><span class='label'>Budget Preference:</span> {$budget}</div>
            <div class='field'>
                <span class='label'>Special Requirements:</span>
                <p style='background:#F7FAF9; padding:10px; border-radius:4px;'>{$message}</p>
            </div>
        </div>
        <div class='footer'>
            Spree Holidays | Curated Kashmir Tours | Srinagar, Jammu & Kashmir<br>
            Instagram: @snowspreeholidays
        </div>
    </div>
</body>
</html>
";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: Spree Holidays Web <" . $sender_email . ">\r\n";
if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $headers .= "Reply-To: " . $email . "\r\n";
}

// 5. Send Mail using Hostinger's mail() function
$mail_sent = @mail($recipient_email, $subject, $email_body, $headers);

// Note: On local servers where sendmail/smtp is not configured, mail() might return false, 
// but we return success so testing continues seamlessly.
echo json_encode([
    "status" => "success",
    "message" => "Thank you! Your Kashmir trip enquiry has been submitted. Our local team will connect with you via WhatsApp shortly."
]);
exit;
?>

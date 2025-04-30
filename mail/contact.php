<?php
if (
    empty($_POST['name']) ||
    empty($_POST['subject']) ||
    empty($_POST['message']) ||
    !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)
) {
    http_response_code(400);
    echo "Please complete the form and provide a valid email.";
    exit();
}

$name     = strip_tags(htmlspecialchars($_POST['name']));
$email    = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$subject  = strip_tags(htmlspecialchars($_POST['subject']));
$message  = strip_tags(htmlspecialchars($_POST['message']));

// ✅ Your email address to receive the message
$to = "your-email@example.com"; // ← Replace this with your actual email

// Email to you
$email_subject = "Website Contact: $subject - from $name";
$email_body = "You received a new message from your website:\n\n"
            . "Name: $name\n"
            . "Email: $email\n"
            . "Subject: $subject\n\n"
            . "Message:\n$message";
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";

$sendToOwner = mail($to, $email_subject, $email_body, $headers);

// ✅ Confirmation email to the user
$confirm_subject = "Thanks for reaching out, $name!";
$confirm_body = "Hi $name,\n\nThank you for contacting me. I’ve received your message and will reply shortly.\n\nHere’s a copy of your message:\n\nSubject: $subject\n\n$message\n\nBest regards,\n[Your Name]";
$confirm_headers = "From: your-email@example.com\r\n"; // Same as $to above

$sendToUser = mail($email, $confirm_subject, $confirm_body, $confirm_headers);

// Final response
if ($sendToOwner && $sendToUser) {
    http_response_code(200);
    echo "Message sent successfully.";
} else {
    http_response_code(500);
    echo "Message could not be sent.";
}
?>

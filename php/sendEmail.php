<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['mail'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];


    try {

        //Aamin
        $mail = new PHPMailer(true);

        // Server settings
        $mail->CharSet = "UTF-8";
        $mail->isSMTP();
        $mail->Host       = 'smtp.m1.websupport.sk'; // Set the SMTP server to send through
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@easy-project.sk'; // SMTP username
        $mail->Password   = 'Easyproject2@'; // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465; // TCP port to connect to
    


        // Recipients
        $mail->setFrom('info@easy-project.sk', 'Easy Project');
        $mail->addAddress('info@easy-project.sk');

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = "
                    Email odosielateľa: $email <br>
                    <br>
                    Dotaz: $message
                    " ;
        $mail->AltBody = "
                    Email odosielateľa: $email \n
                    \n
                    Dotaz: $message
                    " ;

        $mail->send();
        echo json_encode(["success" => true, "message" => "Správa bola úspešne odoslaná."]);
    } catch (Exception $e) {
        echo json_encode(["message" => "Vašu správu sa nepodarilo odoslať."]) ;
    }




    // CLIENT
    try {

        //Aamin
        
        $mail = new PHPMailer(true);
        $mail->CharSet = "UTF-8";
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.m1.websupport.sk'; // Set the SMTP server to send through
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@easy-project.sk'; // SMTP username
        $mail->Password   = 'Easyproject2@'; // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465; // TCP port to connect to
        
 
        // Recipients
        $mail->setFrom('info@easy-project.sk', 'Easy Project');
        $mail->addAddress($email);

        // Content
        $mail->isHTML(true);
        $mail->Subject = "Ďakujeme za vašu správu";
        $mail->Body = "
                    Dobrý deň,<br>
                    ďakujeme, že ste nás kontaktovali prostredníctvom našej webovej stránky. Vaša správa bola úspešne prijatá a čo najskôr sa vám ozveme.
                    <br><br>
                    V prípade urgentnej záležitosti nás môžete kontaktovať telefonicky na čísle: +421 944 198 925.<br>
                    S pozdravom, 
                    <br><br>
                    Tím Easy Project
                    " ;
        $mail->AltBody = "
                    Dobrý deň,\n
                    ďakujeme, že ste nás kontaktovali prostredníctvom našej webovej stránky. Vaša správa bola úspešne prijatá a čo najskôr sa vám ozveme.
                    \n
                    \n
                    V prípade urgentnej záležitosti nás môžete kontaktovať telefonicky na čísle: +421 944 198 925.
                    \n
                    S pozdravom, 
                    \n\n
                    Tím Easy Project
                    " ;

        $mail->send();
        echo json_encode(["success" => true, "message" => "Správa bola úspešne odoslaná."]);
    } catch (Exception $e) {
        echo json_encode(["message" => "Vašu správu sa nepodarilo odoslať."]) ;
    }


} else {
    echo json_encode(["message" => 'Invalid request method.']);
}
?>
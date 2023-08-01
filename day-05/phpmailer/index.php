<?php
/*##########Script Information#########
  # Purpose: Send mail Using PHPMailer#
  #          & Gmail SMTP Server 	  #
  # Created: 24-11-2019 			  #
  #	Author : Hafiz Haider			  #
  # Version: 1.0					  #
  # Website: www.BroExperts.com 	  #
  #####################################*/

//Include required PHPMailer files
	require 'includes/PHPMailer.php';
	require 'includes/SMTP.php';
	require 'includes/Exception.php';
//Define name spaces
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\SMTP;
	use PHPMailer\PHPMailer\Exception;


$errors = [];
$errorMessage = '';

if (!empty($_POST)) {
   $name = $_POST['name'];
   $email = $_POST['email'];
   $phone = $_POST['phoneNumber'];

// specify SMTP credentials
	$mail = new PHPMailer();

	$mail->SMTPDebug = SMTP::DEBUG_SERVER;
//Set mailer to use smtp
	$mail->isSMTP();
//Define smtp host
	$mail->Host = "smtp.gmail.com";
//Enable smtp authentication
	$mail->SMTPAuth = true;
//Set smtp encryption type (ssl/tls)
	$mail->SMTPSecure = "tls";
//Port to connect smtp
	$mail->Port = "587";
//Set gmail username
	$mail->Username = "dumanovskyfinance@gmail.com";
//Set gmail password
	$mail->Password = "yykmxheirqsjfsbx";

//Email subject
	$mail->Subject = "100DaysOfCode";
//Set sender email
	$mail->setFrom($email);
//Enable HTML
	$mail->isHTML(true);
//Attachment
	// $mail->addAttachment('img/attachment.png');
//Add recipient
	$mail->addAddress('dumanovskyfinance@gmail.com');
// Enable HTML if needed
    $mail->isHTML(true);

// Array of elements to be sent..
       
	$bodyParagraphs = ["<strong>Name:</strong> {$name}", "<strong>Email:</strong> {$email}", "<strong>Phone:</strong> {$phone}"];


    $body = join('<br />', $bodyParagraphs);

    $mail->Body = $body;

    echo $body;


	if ( $mail->send() ) {

		echo "Email Sent..!";
	}else {

		echo "Message could not be sent. Mailer Error: ";
	}
   }
?>


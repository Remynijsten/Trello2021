<?php

require('../core/core_functions.php');
require('../core/connection.php');

$error;

// When the user hasn't logged in yet. We set the session variable to be able load the default header.
if(!isset($_SESSION['login'])){
	$_SESSION['login'] = false;
}

$name = validate($_POST['name']);
$mail = validate($_POST['email']);
$password = password_hash(validate($_POST['name']), PASSWORD_BCRYPT);
$function = $_POST['function'];

// Routing based on post function runs if errors are still empty
if(isset($function) && empty($error)){
	switch ($function) {
		case 'register':
			if(check_user($mail)){
				$error = 100;
			} else {
				create_user($name, $mail, $password);
			}
			break;
		
		default:
			# code...
			break;
	}	
}

function create_user($name, $mail, $password) {
	global $conn;
	try{
		$stmt = $conn->prepare("INSERT INTO `users` (name, email, password) VALUES (:name, :mail, :password)");
		$stmt->bindParam(':name', $name);
		$stmt->bindParam(':mail', $mail);
		$stmt->bindParam(':password', $password);

		return $stmt->execute();		
	} catch(PDOException $e){
		$error = 500;
	}
}

function check_user($mail) {

	global $conn;
	try{
		$stmt = $conn->prepare('SELECT * FROM `users` WHERE email = :mail');
		$stmt->bindParam(':mail', $mail);
		$stmt->execute();
	} catch(PDOException $e){
		$error = 500;
	}

	if($stmt->rowCount() != 0){
		return true;
	} else{
		return false;
	}
}

if(!empty($error)){
	echo $error;
}
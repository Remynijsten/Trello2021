<?php

require('../class/class.user.php');
$error;

// When the user hasn't logged in yet. We set the session variable to be able load the default header.
if(!isset($_SESSION['login'])){
	$_SESSION['login'] = false;
}

// Validate user input & Hash password for data insertion
$name 		= validate($_POST['name']);
$mail 		= validate($_POST['email']);
$password 	= password_hash(validate($_POST['password']), PASSWORD_BCRYPT);
$function 	= $_POST['function'];

// Checks if all fields are filled in and create object instance
if(!check_empty_vars($name, $mail, $password)){
	$user = new User($name, $mail, $password);
} else {
	$error = 200;
}

//Routing based on post function runs if errors are still empty
if(isset($function) && empty($error)){
	switch ($function) {
		case 'register':
			if( $user->check_user($user->mail)){
				$error = 100;
			} else {
				$user->create_user($user->name, $user->mail, $user->password);
			}
			break;
		
		default:
			break;
	}	
}

if(!empty($error)){
	echo $error;
}
<?php

require('../class/class.user.php');
$return_code;

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
	$return_code = 200;
}

//Routing based on post function runs if errors are still empty
if(isset($function) && empty($return_code)){
	switch ($function) {
		case 'register':
			if( $user->check_user($user->mail)){
				$return_code = 100;
			} else {
				$user->create_user($user->name, $user->mail, $user->password);
			}
			break;
		
		default:
			break;
	}	
}

if(!empty($return_code)){
	echo $return_code;
}
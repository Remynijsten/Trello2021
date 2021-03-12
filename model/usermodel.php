<?php

require('../class/class.user.php');
$return_code;

// When the user hasn't logged in yet. We set the session variable to be able load the default header.
if(!isset($_SESSION['login'])){
	$_SESSION['login'] = false;
}

// Clean user input & Hash password for data insertion
if(isset($_POST['name'])){
	$name 			= validate($_POST['name']);	
} else {
	$name 			= 'Guest';
}

if(isset($_POST['email'])){
	$mail 			= validate($_POST['email']);
}

// Check if password exists and if not empty to prevent empty string hashing which results in a !empty string.
if(isset($_POST['password']) && !empty($_POST['password'])){
	$password 		= password_hash(validate($_POST['password']), PASSWORD_BCRYPT);	
} else {
	$return_code 	= 200;
}

$function 	= $_POST['function'];

// If no errors have been found up untill this point, create the user object from the User Class.
if(empty($return_code)){
	$user = new User($name, $mail, $password);
}

// //Routing based on post function runs if errors are still empty
if(isset($function) && empty($return_code)){
	switch ($function) {
		case 'register':

			// Check if all fields are filled & if the user doesn't yet exist. Then create the user
			if(check_empty_vars($name, $mail, $password)){
				$return_code = 200;
			} else {
				if( $user->check_user($user->mail)){
					$return_code = 100;
				} else {
					$user->create_user($user->name, $user->mail, $user->password);
				}				
			}
			break;

		case 'login':
			// Check if user entered correct credentials. Then login the session and return response code.
			if(!check_empty_vars($mail, $password)){

				// If user's mail doesn't exist in the database
				if(!$user->check_user($user->mail)){
					$return_code = 75;
				} else {
					if(!$user->validate_login($user->mail, $_POST['password'])){
						echo $user->validate_login($user->mail, $_POST['password']);
						$return_code = 125;
					} else {
						$user->log_in($user->name, $user->mail);
						$return_code = 50;
					}
				}
			} else{
				$return_code = 200;
			}
			break;
		
		default:
			break;
	}	
}

//If errors have been found, echo the code to the front-end
if(!empty($return_code)){
	echo $return_code;
}
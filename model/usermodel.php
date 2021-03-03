<?php

session_start();

// When the user hasn't logged in yet. We set the session variable to be able load the default header.
if(!isset($_SESSION['login'])){
	$_SESSION['login'] = false;
}

// Validate user input fields
foreach($_POST as $key => $value){
	$_POST[$key] = validate($_POST[$value]);
}

// Routing based on post function
if(isset($_POST['function'])){
	switch ($_POST['function']) {
		case 'register':
			
			break;
		
		default:
			# code...
			break;
	}	
}

/**
 * Validates user input
 * @param string $data - User field data
 * @return Safe data
 */
function validate($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

function userExists($mail) {

}
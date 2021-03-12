<?php

require('../class/class.list.php');
$return_code;

$_POST = json_decode(file_get_contents('php://input'));


if(isset($_POST->function)){

	switch ($_POST->function) {
		case 'get_all_lists':
			print_r(json_encode(get_all_lists()));
			break;
		
		default:
			# code...
			break;
	}	
} else{
	var_dump();
}


function get_all_lists(){
	global $conn;

	$stmt = $conn->prepare('SELECT * FROM `lists` WHERE user = :user ORDER BY `order` ASC');
	$stmt->bindParam(':user', $_SESSION['user_id']);
	$stmt->execute();
	$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

	return $result;
}
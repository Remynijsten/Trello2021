<?php

$return_code;
session_start();
require('../core/core_functions.php');
require('../core/connection.php');

$_POST = json_decode(file_get_contents('php://input'));

forEach($_POST as $key => $value){
	$$key = validate($value);
}

if(isset($function)){

	switch ($function) {
		case 'get_all_tasks':
			print_r(json_encode(get_all_tasks($id, $sort)));
			break;

		case 'add_task':
			print_r(json_encode(add_task($title)));
			break;

		case 'remove_task':
			print_r(json_encode(remove_task($id)));
			break;

		case 'update_task':
			print_r(json_encode(update_task($title, $status, $id)));
			break;
		
		default:
			# code...
			break;
	}	
}

function get_all_tasks($id, $sort){
	global $conn;

	$stmt = $conn->prepare('SELECT * FROM `tasks` WHERE user=:user AND card=:card ORDER BY '.$sort.' DESC');
	$stmt->bindParam(':user', $_SESSION['user_id']);
	$stmt->bindParam(':card', $id);
	// $stmt->bindParam(':sorting', $sort);
	$stmt->execute();
	return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function add_task($title){

}

function remove_task($id){

}

function update_task($title, $status, $id){
	
}
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
		case 'get_all_cards':
			print_r(json_encode(get_all_cards($id)));
			break;

		case 'add_card':
			print_r(json_encode(add_card($title)));
			break;

		case 'remove_card':
			print_r(json_encode(remove_card($id)));
			break;

		case 'update_card':
			print_r(json_encode(update_card($title, $status, $id)));
			break;
		
		default:
			# code...
			break;
	}	
}

function get_all_cards($id){
	global $conn;

	$stmt = $conn->prepare('SELECT * FROM `cards` WHERE user=:user AND list=:list');
	$stmt->bindParam(':user', $_SESSION['user_id']);
	$stmt->bindParam(':list', $id);
	$stmt->execute();
	return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function add_card($title){

}

function remove_card($id){

}

function update_card($title, $status, $id){
	
}
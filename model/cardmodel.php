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
			print_r(json_encode(add_card($title, $list)));
			break;

		case 'remove_card':
			print_r(json_encode(remove_card($id)));
			break;

		case 'update_card':
			print_r(json_encode(update_card($title, $id)));
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

function add_card($title, $list){
	global $conn;

	$stmt = $conn->prepare('INSERT INTO `cards` (user, title, list) VALUES (:user, :title, :list)');
	$stmt->bindParam(':user', $_SESSION['user_id']);
	$stmt->bindParam(':title', $title);
	$stmt->bindParam(':list', $list);
	$stmt->execute();

}

function remove_card($id){
	global $conn;

	$stmt = $conn->prepare('DELETE FROM `cards` WHERE id=:id');
	$stmt->bindParam(':id', $id);
	$stmt->execute();
}

function update_card($title, $id){
	global $conn;

	$stmt = $conn->prepare('UPDATE `cards` SET title=:title WHERE id=:id');
	$stmt->bindParam(':title', $title);
	$stmt->bindParam(':id', $id);
	$stmt->execute();	
}
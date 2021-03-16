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
		case 'get_all_lists':
			print_r(json_encode(get_all_lists()));
			break;

		case 'add_list':
			print_r(json_encode(add_list($title)));
			break;

		case 'remove_list':
			print_r(json_encode(remove_list($id)));
			break;

		case 'update_list':
			print_r(json_encode(update_list($title, $id)));
			break;
		
		default:
			# code...
			break;
	}	
}

function get_all_lists(){
	global $conn;

	$stmt = $conn->prepare('SELECT * FROM `lists` WHERE user = :user ORDER BY id ASC');
	$stmt->bindParam(':user', $_SESSION['user_id']);
	$stmt->execute();
	$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

	return $result;
}

function add_list($title){
	global $conn;
	$user 		= intval($_SESSION['user_id']);

	// Insert new list row
	$q = $conn->prepare('INSERT INTO `lists` (title, user) VALUES (:title, :user)');
	$q->bindParam(':title', 	$title);
	$q->bindParam(':user', 	$user);
	$q->execute();
}

function remove_list($id){
	global $conn;

	$stmt = $conn->prepare('DELETE FROM `lists` WHERE id=:id');
	$stmt->bindParam(':id', $id);

	return $stmt->execute();
}

function update_list($title, $id){
	global $conn;

	$stmt = $conn->prepare('UPDATE `lists` SET title=:title WHERE id=:id');
	$stmt->bindParam(':title', $title);
	$stmt->bindParam(':id', $id);

	return $stmt->execute();
}
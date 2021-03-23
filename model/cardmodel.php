<?php

$return_code;
session_start();
require('../core/core_functions.php');
require('../core/connection.php');

// Convert raw input string to PHP object
$_POST = json_decode(file_get_contents('php://input'));

// Creates new variables for each post value
forEach($_POST as $key => $value){
	$$key = validate($value);
}

if(isset($function)){

	switch ($function) {
		case 'get_all_cards':
			print_r(json_encode(get_all_cards($id)));
			break;

		case 'add_card':
			print_r(json_encode(add_card($title, $link)));
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

/**
  * Returns all card rows by user's ID and the related list
  * @param {$id} integer - Related list id to load cards for
  */
function get_all_cards($id){
	global $conn;

	$stmt = $conn->prepare('SELECT * FROM `cards` WHERE user=:user AND list=:list');
	$stmt->bindParam(':user', $_SESSION['user_id']);
	$stmt->bindParam(':list', $id);
	$stmt->execute();
	return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

/**
  * Inserts a new card in the database
  * @param {$title} string - Card title
  * @param {$list} integer - Related list id
  */
function add_card($title, $list){
	global $conn;

	$stmt = $conn->prepare('INSERT INTO `cards` (user, title, list) VALUES (:user, :title, :list)');
	$stmt->bindParam(':user', $_SESSION['user_id']);
	$stmt->bindParam(':title', $title);
	$stmt->bindParam(':list', $list);
	$stmt->execute();

}

/**
  * Removes a card row from the database
  * @param {$title} integer - card row id
  */
function remove_card($id){
	global $conn;

	$stmt = $conn->prepare('DELETE FROM `cards` WHERE id=:id');
	$stmt->bindParam(':id', $id);
	$stmt->execute();
}

/**
  * Update a card title
  * @param {$title} string - card title
  * @param {$id} integer - card row id
  */
function update_card($title, $id){
	global $conn;

	$stmt = $conn->prepare('UPDATE `cards` SET title=:title WHERE id=:id');
	$stmt->bindParam(':title', $title);
	$stmt->bindParam(':id', $id);
	$stmt->execute();	
}
<?php

$return_code;
session_start();
require('../core/core_functions.php');
require('../core/connection.php');

$_POST = json_decode(file_get_contents('php://input'));

forEach($_POST as $key => $value){
	$$key = validate($value);
}

// Checks the post function and calls the correct function
if(isset($function)){

	switch ($function) {
		case 'get_all_tasks':
			print_r(json_encode(get_all_tasks($id, $sort, $filter)));
			break;

		case 'add_task':
			print_r(json_encode(add_task($title, $description, $status, $duration, $card)));
			break;

		case 'remove_task':
			print_r(json_encode(remove_task($id)));
			break;

		case 'update_task':
			print_r(json_encode(update_task($title, $status, $description, $duration, $id)));
			break;
		
		default:
			# code...
			break;
	}	
}

/**
  * Returns all tasks for the related card
  * @param {$id} integer - related card id to load tasks for
  * @param {$sort} string - The sorting method to load the rows
  */
function get_all_tasks($id, $sort, $filter){
	global $conn;

	$stmt = $conn->prepare('SELECT * FROM `tasks` WHERE user=:user AND card=:card AND status=:filter ORDER BY '.$sort.' ASC');
	$stmt->bindParam(':filter', $filter);
	$stmt->bindParam(':user', $_SESSION['user_id']);
	$stmt->bindParam(':card', $id);
	$stmt->execute();
	return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

/**
  * Insert a new task in the database
  * @param {$title} string - Task title
  * @param {$description} string - The description of the task
  * @param {$status} string - The status of the task
  * @param {$duration} integer - The duration of the task
  * @param {$card} id - The related card to link the task to
  */
function add_task($title, $description, $status, $duration, $card){
	global $conn;

	$stmt = $conn->prepare('INSERT INTO `tasks` (title, description, status, user, duration, card) VALUES (:title, :description, :status, :user, :duration, :card)');
	$stmt->bindParam(':title', $title);
	$stmt->bindParam(':description', $description);
	$stmt->bindParam(':status', $status);
	$stmt->bindParam(':user', $_SESSION['user_id']);
	$stmt->bindParam(':duration', $duration);
	$stmt->bindParam(':card', $card);
	$stmt->execute();
}

/**
  * Remove a task from the database
  * @param {$id} integer - Task row id to remove
  */
function remove_task($id){
	global $conn;

	$stmt = $conn->prepare('DELETE FROM `tasks` WHERE id=:id');
	$stmt->bindParam(':id', $id);
	$stmt->execute();
}

/**
  * Update a task
  * @param {$title} string - Task title
  * @param {$description} string - The description of the task
  * @param {$status} string - The status of the task
  * @param {$duration} integer - The duration of the task
  * @param {$card} id - The related card to link the task to
  */
function update_task($title, $status, $description, $duration, $id){
	global $conn;

	$stmt = $conn->prepare('UPDATE `tasks` SET title=:title, duration=:duration, status=:status, description=:description WHERE id=:id');
	$stmt->bindParam(':title', $title);
	$stmt->bindParam(':status', $status);
	$stmt->bindParam(':description', $description);
	$stmt->bindParam(':duration', $duration);
	$stmt->bindParam(':id', $id);
	$stmt->execute();	
}
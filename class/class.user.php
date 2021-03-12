<?php

require('../core/core_functions.php');
require('../core/connection.php');

session_start();

class User {

	public $name;
	public $mail;
  
	public function __construct($name, $mail, $password) {
    	$this->name 			= $name;
    	$this->mail 			= $mail;
    	$this->password 		= $password;
	}

	public function log_in($name, $mail){
		$_SESSION['login'] 		= true;
		$_SESSION['mail'] 		= $mail;
		$_SESSION['name'] 		= $this->return_name($mail);
		$_SESSION['user_id'] 	= $this->return_user_id($mail);
	}

	public function return_name($mail){
		global $conn;

		$stmt = $conn->prepare('SELECT * FROM `users` WHERE email = :mail');
		$stmt->bindParam(':mail', $mail);
		$stmt->execute();

		$result = $stmt->fetch(PDO::FETCH_ASSOC);
		return $result['name'];
	}

	public function return_user_id($mail){
		global $conn;

		$stmt = $conn->prepare('SELECT id FROM `users` WHERE email = :mail');
		$stmt->bindParam(':mail', $mail);
		$stmt->execute();

		$result = $stmt->fetch(PDO::FETCH_ASSOC);
		return $result['id'];
	}

	/**
	  * Function create_user - Inserts new user into the database
	  */
	public function create_user($name, $mail, $password){

		global $conn;
		try{
			$stmt = $conn->prepare("INSERT INTO `users` (name, email, password) VALUES (:name, :mail, :password)");
			$stmt->bindParam(':name', $name);
			$stmt->bindParam(':mail', $mail);
			$stmt->bindParam(':password', $password);

			return $stmt->execute();	
		} catch(PDOException $e){
			$return_code = 500;
		}
	}

	/**
	  * Function check_user 	- Checks if user allready exists by counting rows
	  */
	public function check_user($mail){

		global $conn;
		try{
			$stmt = $conn->prepare('SELECT * FROM `users` WHERE email = :mail');
			$stmt->bindParam(':mail', $mail);
			$stmt->execute();

			if($stmt->rowCount() != 0){
				return true;
			} else{
				return false;
			}

		} catch(PDOException $e){
			$return_code = 500;
		}
	}

	/**
	  * Function validate_login 	- Checks if user allready exists by counting rows
	  */
	public function validate_login($mail, $password){

		global $conn;
		try{
			$stmt = $conn->prepare('SELECT * FROM `users` WHERE email = :mail');
			$stmt->bindParam(':mail', $mail);
			$stmt->execute();
			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			if(password_verify( $password, $result['password'] ) == true){
				return true;
			} else{
				return false;
			}

		} catch(PDOException $e){
			$return_code = 500;
		}
	}
}
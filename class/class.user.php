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

	public function log_in(){
		$_SESSION['login'] 		= true;
		$_SESSION['username'] 	= $this->username;
		$_SESSION['mail'] 		= $this->mail;
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
			$error = 500;
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
			$error = 500;
		}
	}

	/**
	  * Function validate_login 	- Checks if user allready exists by counting rows
	  */
	public function validate_login(){

		global $conn;
		try{
			$stmt = $conn->prepare('SELECT password FROM `users` WHERE email = :mail');
			$stmt->bindParam(':mail', $this->mail);
			$stmt->execute();
			$result = $stmt->fetch(PDO::FETCH_ASSOC);

			return password_verify( $this->password, $result['password'] );

		} catch(PDOException $e){
			$error = 500;
		}

	}


}
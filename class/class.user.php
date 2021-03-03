<?php

class User {
	public $username;
	public $mail;
  
	public function __construct($username, $mail) {
    	$this->username = $username;
	}

	public function log_in(){
		$_SESSION['login'] = true;
		$_SESSION['username'] = $this->username;
		$_SESSION['mail'] = $this->mail;
	}
}
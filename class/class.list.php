<?php

require('../core/core_functions.php');
require('../core/connection.php');

session_start();

class Tasklist {
	
	public function __construct($title){
		$this->title = $title;
	}

}
<?php  

	$dsn = "mysql:host=localhost;dbname=checkmate";
	$user = "root";
	$passwd = "";

	// Server connection
	$conn = new PDO($dsn, $user, $passwd);
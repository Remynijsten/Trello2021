<?php
session_start();
// If the user is not logged in, render the home page.

if(!$_SESSION['login']){
	header("Location:" . ROOT . "home");
	die();
}


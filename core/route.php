<?php
session_start();
// $_SESSION['login'] = false;
// Split URL with slashes
$route 		= explode('/', $_SERVER['REQUEST_URI']);

// Remove GET parameters from URL
$route[2]   = strtok($route[2], '?');

// If there is no request in the url, for example; /register, render the homepage. else, render the file with the same name.
if(empty($route[2])){
	render('home');
}else{
	render($route[2]);
}

if(!isset($_SESSION['login'])){
  $_SESSION['login'] = false;
}

/**
  *	render function - Load the header, related page and the footer.
  * @param string $file - The filename to load in the view
  */
function render($file) {
    require('templates/head.php');

    if(isset($_SESSION['login'])){
        if(!$_SESSION['login']){
            require('templates/header-home.php');
        } else{
            require('templates/header.php');
        }      
    }

    require('templates/pages/' . $file . '.php');   
    require('templates/footer.php');
}   
<?php

$route 		= explode('/', $_SERVER['REQUEST_URI']);

/**
  *	If there is no request in the url, for example; /register, render the homepage.
  * else, render the page with the same name
  */
if(empty($route[2])){
	render('home');
}else{
	render($route[2]);
}
    
/**
  *	render function - Load the header, related page and the footer.
  * @param string $file - The filename to load in the view
  */
function render($file) {
    require('templates/head.php');
    require('templates/pages/' . $file . '.php');   
	require('templates/footer.php');
}
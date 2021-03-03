<?php

$route 		= explode('/', $_SERVER['REQUEST_URI']);

if(empty($route[2])){
	render('home');
}else{
	render($route[2]);
}

function render($filename) {
	require('templates/head.php');

	require('templates/pages/' . $filename . '.php');

	require('templates/footer.php');

}
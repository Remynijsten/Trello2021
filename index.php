<?php 
session_start();

define('ROOT', '../checkmate/');

include 'templates/head.php';

include 'templates/header-default.php';


/** Returns and cleans request URI string */
$route = str_replace('/checkmate', '', $_SERVER['REQUEST_URI']);

/**	
*	URI Routing switch determines which php content to load per URL
* 	Sets a single-line title.
* 	@param string $route Page request title. For example: 'register'
* 	@return Includes related content php files
**/
switch ($route) {

	case '/':
		include 'templates/pages/home.php';
		break;

    case '/register' :
        include 'templates/pages/register.php';
        break;
    
    default:
        include 'templates/pages/404.php';
        break;
}


include 'templates/footer.php';
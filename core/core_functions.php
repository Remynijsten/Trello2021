<?php 

/**
 * Validates user input
 * @param string $data - User field data
 * @return Safe data
 */
function validate($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}
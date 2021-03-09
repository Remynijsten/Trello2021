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

/**
 * Checks if any of the given parameters is empty
 * @return Boolean
 */
function check_empty_vars() {

	$empty = false;
	foreach(func_get_args() as $value){
		if(empty($value)){
			$empty = true;
		}
	}
	return $empty;

}
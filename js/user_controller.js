const lottie 	= $('lottie-player');
const user_form = $('.user-form');	

/**
  * Event handler for submitting the login form
  * Sends form data to the server and receives a reponse code
  */
user_form.addEventListener('submit', function(e){
	e.preventDefault();
	let data = new FormData(user_form);

	// Appends function property to formdata object
	user_form.dataset.form == 'login' ? data.append('function', 'login') : data.append('function', 'register');

	// Create ajax request
	let ajax = new XMLHttpRequest();
	ajax.open("POST", "model/usermodel.php", false);
	ajax.send(data);
	
	// Display error messages to the user
	display_message(return_response(ajax.responseText));

	// If the response code is succesfull login or registration, redirect to lists page.
	setTimeout(function(){
		ajax.responseText == '50' || ajax.responseText == '51' ? window.location.href = root + 'lists' : '' ;	
	}, 3000);
});

/**
  * Returns correct message to the user
  * @param {string} code - response code from a login request
  */
function return_response(code) {

	switch(code) {
		case '50':
			return ['Logging in...', 'check'];
			break;

		case '51':
			return ['Account succesfully created, Redirecting you', 'check'];
			break;

		case '75':
			return ['Account not found, Please register first', 'error'];
			break;

		case '100':
			return ['User allready exists', 'error'];
			break;

		case '125':
			return ['You have entered the wrong password', 'error'];
			break;

		case '200':
			return ['Please fill out all fields', 'error'];
			break;

		case '500':
			return ['There was a server error, Please contact support.', 'error'];
			break;

		case 'logged out':
			window.location.href = root;
			break;

		default:
			return ['Multiple responses from the server, Please contact support', 'error'];
			break;
	}
}
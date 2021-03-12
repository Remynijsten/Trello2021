const lottie = document.querySelector('lottie-player');
const user_form = document.querySelector('.user-form');

user_form.addEventListener('submit', function(e){
	e.preventDefault();
	let data = new FormData(user_form);

	user_form.dataset.form == 'login' ? data.append('function', 'login') : data.append('function', 'register');

	let ajax = new XMLHttpRequest();
	ajax.open("POST", "model/usermodel.php", false);
	ajax.send(data);
	
	// Display error messages to the user
	display_message(return_response(ajax.responseText));

	// If the responsecode is login, redirect to lists page.
	setTimeout(function(){
		ajax.responseText == '50' ? window.location.href = root + 'lists' : '' ;	
	}, 1000);
});

function return_response(code) {

	switch(code) {
		case '50':
			return ['Logging in...', 'check'];
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

		default:
			return ['Multiple responses from the server, Please contact support', 'error'];
			break;
	}
}
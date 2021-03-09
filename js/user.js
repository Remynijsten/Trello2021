const user_form = document.querySelector('.user-form');

user_form.addEventListener('submit', function(e){
	e.preventDefault();
	let data = new FormData(user_form);

	user_form.dataset.form == 'login' ? data.append('function', 'login') : data.append('function', 'register');

	let ajax = new XMLHttpRequest();
	ajax.open("POST", "model/usermodel.php", false);
	ajax.send(data);
	
	display_message(return_response(ajax.responseText));
});

function return_response(code) {
	switch(code) {
		case 100:
			return ['User allready exists', 'error'];
			break;

		case 200:
			return ['Not all fields are filled in', 'error'];
			break;

		case 500:
			return ['There was a server error, Please contact support.', 'error'];
			break;

		default:
			return ['Multiple responses from the server, Please contact support', 'error'];
			break;
	}
}
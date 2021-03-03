const register_form = document.querySelector('.register-form');

register_form.addEventListener('submit', function(e){
	e.preventDefault();
	let data = new FormData(register_form);
	data.append('function', 'register');

	let ajax = new XMLHttpRequest();
	ajax.open("POST", "model/usermodel.php", false);
	ajax.send(data);
	
	switch(ajax.responseText) {
		case 100:
			display_error('User allready exists');
			break;
		case 500:
			display_error('There was a connection error');
			break;

		default:
			
			break;
	}
});


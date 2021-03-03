const register_form = document.querySelector('.register-form');

register_form.addEventListener('submit', function(e){
	e.preventDefault();
	let data = new FormData(register_form);
	data.append('function', 'register');

	let ajax = new XMLHttpRequest();
	ajax.open("POST", "model/usermodel.php", false);
	ajax.send(data);
	
	let response = ajax.responseText;
});


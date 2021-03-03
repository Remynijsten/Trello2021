function ajax(model, method, params, callback){
	params = 'data=' + JSON.stringify(params);

	var xhr = new XMLHttpRequest();
	xhr.open(method, './model/' + model + '.php');
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.onload = function() {
	    if (xhr.status === 200) {
	        callback(xhr.responseText);
	    }
	    else{
	        return false;
	    }
	};
	
	if(params != ''){
		xhr.send(params);
	} else {
		xhr.send(null);
	}
}

function display_error(message, mode){
	let modal = document.querySelector('.modal');
	let logo = modal.querySelector('.modal_body_logo');

	if(mode == 'error'){
		logo.classList.remove('logo_check');
		logo.classList.add('logo_error');
	} else{
		logo.classList.remove('logo_error');
		logo.classList.add('logo_check');		
	}

	modal.classList.remove('d-none');
	modal.classList.add('d-flex');
	modal.querySelector('.modal_body_message').innerText = message;
}

document.querySelector('.modal_body_close').onclick = function(){
	let modal = document.querySelector('.modal');

	modal.classList.remove('d-flex');
	modal.classList.add('d-none');
}
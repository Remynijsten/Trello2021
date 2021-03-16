function display_message(data){
	let message = data[0];
	let mode 	= data[1];
	let modal 	= document.querySelector('.modal');
	let logo 	= modal.querySelector('.modal_body_logo');
	lottie.stop();
	lottie.play();

	if(mode == 'error'){
		lottie.load('https://assets3.lottiefiles.com/packages/lf20_IIxb9U.json');
		logo.classList.remove('logo_check');
		logo.classList.add('logo_error');
	} else{
		lottie.load('https://assets6.lottiefiles.com/packages/lf20_0fwl68.json');
		logo.classList.remove('logo_error');
		logo.classList.add('logo_check');		
	}

	modal.classList.remove('d-none');
	modal.classList.add('d-flex');
	modal.querySelector('.modal_body_message').innerText = message;
}

document.querySelectorAll('.modal_body_close').forEach(closebtn => closebtn.addEventListener('click', function(){
	let modal = this.closest('.modal');

	modal.classList.remove('d-flex');
	modal.classList.remove('d-block');
	modal.classList.add('d-none');
}));

function ajax_request(data, server_function, model){
	data.function = server_function;

	let ajax = new XMLHttpRequest();
	ajax.open("POST", model, false);
	ajax.send(JSON.stringify( data ));
	let response = JSON.parse(ajax.responseText);
	
	return response;
}
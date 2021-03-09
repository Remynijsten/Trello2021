function display_message(data){
	let message = data[0];
	let mode 	= data[1];
	let modal 	= document.querySelector('.modal');
	let logo 	= modal.querySelector('.modal_body_logo');

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
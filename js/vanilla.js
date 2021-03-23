// Bind shorthand functions for queryselectors
Node.prototype.on 			= Node.prototype.addEventListener;
Node.prototype.off 			= Node.prototype.removeEventListener;
$  							= document.querySelector.bind(document)
$$ 							= document.querySelectorAll.bind(document)

data 	 					= {};
var cards					= [];
var tasks 					= [];
var lists 					= [];
let response, bodyclass		= '';
let submit_modal 			= '';
let sort 					= 'id';
let filter 					= 'Not Started';
let current_card 			= '';

// Markups to load, replace content and append as HTML string
const list_markup 			= '<div class="lists-container single animate__animated animate__bounceIn" data-id="%id%"><div class="lists-container-item"><i class="fas fa-bars" aria-hidden="true"></i><h2 class="lists-container-item-title single-title">%title%</h2><div class="lists-container-item-controls"><i class="fas fa-ellipsis-h update-button" aria-hidden="true" data-body="lists"></i><i class="fas fa-arrow-circle-right viewlist"></i></div></div></div>';
const card_markup 			= '<div class="card-container single animate__animated animate__bounceIn" data-id="%id%" data-row="%row%"><div class="card-container-header"><h1 class="card-container-header-title single-title">%title%</h1><span class="card-container-header-menu"><i class="fas fa-ellipsis-h update-button" aria-hidden="true" data-body="cards"></i></span></div><div class="tasks-section"></div><div class="create-button" data-body="tasks">Add new task +</div></div>';
const task_markup 			= '<div class="task-container single" data-id="%id%"><p class="task-container-title single-title">%title%</p><p class="task-container-description single-description">%desc%</p><div class="row task-info-wrapper"><div class="col-3"><i class="far fa-clock"></i><p class="duration">%duration%</p></div><div class="col-9"><i class="fas fa-info-circle"></i><p class="status">%status%</p></div></div><div class="task-container-controls"><span class="task-container-controls-menu"><i class="fas fa-ellipsis-h update-button" aria-hidden="true" data-body="tasks"></i></span></div></div>';

/**
  * Display a modal containing a Lottie animation and a message
  * @param {data} object - The message and Lottie JSON to display
  */
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

/**
  * Shorthand function to create, open and send data to the server
  * @param {data} object 			- Data containing post parameters
  * @param {server_function} string - Routing function post parameter / Function name to call
  * @param {data} string 			- File to post to
  * @return {object} reponse 		- Returns the server response
  */
function ajax_request(data = {}, server_function, model){
	data.function = server_function;

	let ajax = new XMLHttpRequest();
	ajax.open("POST", model, false);
	ajax.send(JSON.stringify( data ));
	let response = JSON.parse(ajax.responseText);
	
	return response;
}

/**
  * Switches between display flex & none on the given element.
  * @param {element} Node - The HTML element to switch
  */
function toggle_modal(element){

	// console.log('modal function called for', element);

	switch(true) {
		case element.classList.contains('d-none'):
			element.classList.remove('d-none');
			element.classList.add('d-flex');
			break;
		case element.classList.contains('d-flex'):
			element.classList.remove('d-flex');
			element.classList.add('d-none');
			break;
	}
}

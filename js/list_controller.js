var data 	= {};
let lists   = [];
let list_markup =
`<div class="lists-container animate__animated animate__bounceIn" data-id="%id%">
	<div class="lists-container-item">
		<i class="fas fa-bars" aria-hidden="true"></i>
		<h2 class="lists-container-item-title">%title%</h2>
		<div class="lists-container-item-controls">
			<i class="fas fa-ellipsis-h openmenu" aria-hidden="true"></i>
			<i class="fas fa-arrow-circle-right viewlist"></i>
		</div>
	</div>
</div>`;

class List{
	constructor(data){
		this.title 	= data['title'];
		this.id 	= data['id'];
	}

	remove_list(id) {
		data 	= {};
		data.id = this.id;
		ajax_request(data, 'remove_list', 'model/listmodel.php');
	}

	update_list(title, id) {
		data 		= {};
		data.id 	= this.id;
		data.title 	= this.title;
		ajax_request(data, 'update_list', 'model/listmodel.php');		
	}
}

/**
  * Sends post request to the server to receive list rows
  */
function get_all_lists(){
	load_cards(ajax_request(data, 'get_all_lists', 'model/listmodel.php'));
}

/**
  * Receives server data rows, replaces strings with data and appends markup to the list container
  * @param {object} data - Server data object
  */
function load_cards(data){

	for(let i = 0; i < data.length; i++){
		// Create class instance
		lists[i] 	= new List(data[i]);
		let c 		= list_markup;
		c 			= c.replace('%title%', data[i].title);
		c 			= c.replace('%id%', i);
		document.querySelector('.lists-section').insertAdjacentHTML( 'beforeend', c );	
	}

	/**
	  * Add onclick events to all edit-list buttons
	  */
	document.querySelectorAll('.openmenu').forEach(menu => menu.addEventListener('click', function(){

		// Open modal
		open_modal('update-list');

		// Change input value to current list title
		document.querySelector('.update-list-modal input[name="title"]').value = this.closest('.lists-container').querySelector('.lists-container-item-title').innerText;	

		// Add list id data attribute to buttons
		document.querySelectorAll('.update-list-modal button').forEach(button => button.dataset.id = this.closest('.lists-container').dataset.id);
	}));

	document.querySelectorAll('.viewlist').forEach(list => list.addEventListener('click', function(){
		let id = lists[this.closest('.lists-container').dataset.id].id;
		window.location.href = '//' + root_url + 'cards?list=' + id;
	}));

}

get_all_lists();

/**
  * Cancel button event listener
  */
document.querySelector('.cancel').onclick = function(){ 
	this.closest('.modal').classList.remove('d-flex');
	this.closest('.modal').classList.add('d-none');
}

/**
  * Update modal button functions
  */
document.querySelectorAll('.update-list-modal button').forEach(button => button.addEventListener('click', function(){

	if(button.classList.contains('remove-list-button')){
		lists[this.dataset.id].remove_list();
	}
	else if(button.classList.contains('update-list-button')){
		lists[this.dataset.id].title = document.querySelector('.update-list-modal input').value;
		lists[this.dataset.id].update_list();		
	}

	// Close modal
	document.querySelector('.cancel').click();

	// Empty wrapper
	document.querySelector('.lists-section').innerHTML = '';

	// Reload lists
	get_all_lists();

}));


document.querySelector('.add_list').addEventListener('click', function(){
	open_modal('add-list');
});

document.querySelector('.addlist-button').addEventListener('click', function(){
	let modal_content 	= this.closest('.modal_body_content');
	data.title 			= modal_content.querySelector('input[name="title"]').value;
	ajax_request(data, 'add_list', 'model/listmodel.php');

	// Close modal
	document.querySelector('.cancel').click();

	// Empty wrapper
	document.querySelector('.lists-section').innerHTML = '';

	// Reload lists
	get_all_lists();
});


function open_modal(name){
	let modal = document.querySelector(`.${name}-modal`);

	if( modal.classList.contains('d-none') ){
		modal.classList.remove('d-none');
		modal.classList.add('d-flex');
	} else {
		modal.classList.add('d-none');
		modal.classList.remove('d-flex');		
	}
}

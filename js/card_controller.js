var data 			= {};
let cards   		= [];

let card_markup 	=
`<div class="card-container animate__animated animate__bounceIn" data-id="%id%" data-index=%index%>
	<div class="card-container-header">
		<h1 class="card-container-header-title">%title%</h1>
		<span class="card-container-header-menu"><i class="fas fa-ellipsis-h open-card-menu" aria-hidden="true"></i></span>
	</div>
	
	<div class="tasks-section"></div>
</div>`;

class Card{
	constructor(data){
		this.title 	= data['title'];
		this.id 	= data['id'];
	}

	remove_card(id) {
		data 	= {};
		data.id = this.id;
		ajax_request(data, 'remove_card', 'model/cardmodel.php');
	}

	update_card() {
		data 		= {};
		data.id 	= this.id;
		data.title 	= this.title;
		ajax_request(data, 'update_card', 'model/cardmodel.php');	
	}
}

/**
  * Sends post request to the server to receive list rows
  */
function get_all_cards(sort){
	data.id = list_id;
	load_cards(ajax_request(data, 'get_all_cards', 'model/cardmodel.php'), sort);
}

/**
  * Receives server data rows, replaces strings with data and appends markup to the list container
  * @param {object} data - Server data object
  */
function load_cards(data, sort){

	for(let i = 0; i < data.length; i++){
		// Create class instance
		cards[i] 	= new Card(data[i]);
		let c 		= card_markup;
		c 			= c.replace('%title%', data[i].title);
		c 			= c.replace('%id%', data[i].id);
		c 			= c.replace('%index%', i);

		
		// Append card markup to wrapper
		document.querySelector('.cards-section').insertAdjacentHTML( 'beforeend', c );
		
		// Create nodelist from all cards
		let card_elements 	= document.querySelectorAll('.card-container');

		// Receive task data per card and append to card container 
		get_all_tasks(data[i].id, sort).forEach(task => {
			tasks[i]= new Task(task);
			let t 	= task_markup;
			t 		= t.replace('%title%', 			task.title);
			t 		= t.replace('%card%',  			task.card);
			t 		= t.replace('%desc%',  	task.description);
			t 		= t.replace('%duration%',  	task.duration);
			t 		= t.replace('%status%',  	task.status);

			// Filter card element to append to by comparing task->list to card id
			parent_card = Array.from(card_elements).filter(e => {
				return e.dataset.id == task.card
			});

			// Append DOMString to correct card element
			parent_card[0].insertAdjacentHTML( 'beforeend', t );
		});
	}

	/**
	  * Add onclick events to all edit-list buttons
	  */
	$$('.open-card-menu').forEach(menu => menu.on('click', function(){
		toggle_modal($('.update-card-modal'));

		// Change input value to current list title
		$('.update-card-modal input[name="title"]').value = this.closest('.card-container').querySelector('.card-container-header-title').innerText;	


		$$('.update-card-modal button').forEach(button => button.dataset.index = this.closest('.card-container').dataset.index);
	}));

	$$('.task-container-controls').forEach(menu => menu.on('click', function(){
		toggle_modal($('.update-task-modal'));

		// Set modal title
		$('.update-task-modal input[name="title"]').value = this.closest('.task-container').querySelector('.task-container-title').innerText;

		// Set modal description
		$('.update-task-modal textarea').value = this.closest('.task-container').querySelector('.task-container-description').innerText;

		// Set modal duration
		$('.update-task-modal input[name="duration"]').value = this.closest('.task-container').querySelector('.duration').innerText;

		// Set modal status
		$('.update-task-modal select').value = this.closest('.task-container').querySelector('.status').innerText;

		// Add task id to buttons
		$$('.update-task-modal button').forEach(button => {
			this.dataset.id = tasks[[...$$('.task-container')].indexOf(menu.closest('.task-container'))].id;
			// console.log(tasks[[...$$('.task-container')].indexOf(menu.closest('.task-container'))]);
		})

	}));



}

get_all_cards('id');

$('.sorting-menu').on('click', function(){
	this.querySelector('.sorting-menu-container').classList.toggle('d-none');
});

$$('.sorting-menu-container p').forEach(option => option.on('click', function(){
	// Empty card container
	$('.cards-section').innerHTML = '';

	// Load new cards
	get_all_cards(option.dataset.sort);
}))

$('.add_card').on('click', function(){
	toggle_modal($('.add-card-modal'));
});

$('.addcard-button').on('click', function(){
	let modal_content 	= this.closest('.modal_body_content');
	data.title 			= modal_content.querySelector('input[name="title"]').value;
	data.list 			= list_id;
	ajax_request(data, 'add_card', 'model/cardmodel.php');

	toggle_modal(this.closest('.modal'));

	// Empty wrapper
	$('.cards-section').innerHTML = '';

	// Reload lists
	get_all_cards('id');
})

$('.update-card').on('click', function(){
	cards[this.dataset.index].title = $('.update-card-modal input[name="title"]').value;

	cards[this.dataset.index].update_card();

	toggle_modal(this.closest('.modal'));

	// Empty wrapper
	$('.cards-section').innerHTML = '';

	// Reload lists
	get_all_cards('id');

});

$('.remove-card').on('click', function(){

	cards[this.dataset.index].remove_card();

	toggle_modal(this.closest('.modal'));

	// Empty wrapper
	$('.cards-section').innerHTML = '';

	// Reload lists
	get_all_cards('id');

});
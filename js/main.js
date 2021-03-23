// Import classes
import List from '../class/class.list.js';
import Card from '../class/class.card.js';
import Task from '../class/class.task.js';

// Object for the update modal containing all its values
let update_modal 			= {
	"title" 				: '',
	"description" 			: '',
	"status" 				: '',
	"duration" 				: '',
	"nodes" 				: {
		"modal" 			: $('.update-modal'),
		"title" 			: $('.update-modal input[name="title"]'),
		"description" 		: $('.update-modal textarea'),
		"duration" 			: $('.update-modal input[name="duration"]'),
		"status" 			: $('.update-modal select')
	},
	
	// Update object properties
	update() 				{
		this.title 			= this.nodes.title.value;
		this.description	= this.nodes.description.value;
		this.duration 		= this.nodes.duration.value;
		this.status 		= this.nodes.status.value;
	},

	// Calls the toggle modal function to switch display classes and hide/show
	toggle()				{
		toggle_modal(this.nodes.modal);
	}
}

/**
 * Checks whether the body has the classname given as parameter
 * @return {boolean} response
 * @param classname
 */
function check_body_class(classname){
	$('body').classList.contains(classname) ? (bodyclass = classname) && (response = true) : response = false;
	return response;
}

/**
  * Switches to check the current body class
  * Empties the content container, sends data request to the server and appends the correct HTML
  */
function load_content(sort, filter=''){
	switch(true) {
		case check_body_class('lists'):
			//Clear Wrapper container
			$('.lists-section').innerHTML = '';

			// Instantiate new object from List class, Replace content from html string, Append list to container
			ajax_request(data, 'get_all_lists', 'model/listmodel.php').forEach( function(data, i) {
				lists[i] 	= new List(data);
				let l 		= list_markup;
				l 			= l.replace('%title%', data.title);
				l 			= l.replace('%id%', i);

				$('.lists-section').insertAdjacentHTML( 'beforeend', l );

				// Add link to view list button
				$$('.viewlist').forEach(list => list.on('click', function(){
					let id = lists[this.closest('.single').dataset.id].id;
					window.location.href = '//' + root_url + 'cards?list=' + id;
				}));
			});
			break;

		case check_body_class('cards'):
			$('.cards-section').innerHTML = '';

			// Instantiate new object from Card class, Replace content from html string, Append list to container
			data.id = list_id;
			ajax_request(data, 'get_all_cards', 'model/cardmodel.php').forEach( function(data, i) {

				cards[i] 	= new Card(data);
				let c 		= card_markup;
				c 			= c.replace('%title%', data.title);
				c 			= c.replace('%id%', i);
				c 			= c.replace('%row%', data.id);

				$('.cards-section').insertAdjacentHTML( 'beforeend', c );

				let card_elements 	= $$('.card-container');

				// Receive task data per card and append to card container 
				data.sort 	= sort;
				data.filter = filter;

				ajax_request(data, 'get_all_tasks', 'model/taskmodel.php').forEach(function(task, i) {
					tasks[tasks.length] 	= new Task(task);
					let t 					= task_markup;
					t 						= t.replace('%title%', 			task.title);
					t 						= t.replace('%id%',  			tasks.length - 1);
					t 						= t.replace('%desc%',  	task.description);
					t 						= t.replace('%duration%',  	task.duration);
					t 						= t.replace('%status%',  	task.status);

					// Filter card element to append to by comparing task->list to card id
					let parent_card = Array.from(card_elements).filter(e => {
						return e.dataset.row == task.card
					});

					// Append DOMString to correct card element
					parent_card[0].insertAdjacentHTML( 'beforeend', t );
				});
			});
		break;

	}
}

/**
  * Closes modal and reloads content
  * @param {modal} Node - The modal element to close
  */
function close_modal_reload(modal){

	// If parameter is not of type DOM element, target Element instead of event.
	modal instanceof Element ? '' : modal = modal.target;
	
	if(bodyclass == 'tasks'){
		bodyclass 			= 'cards';
		$('body').className = 'cards';
	}

	// Empty HTML wrapper
	// $(`.${bodyclass}-section`).innerHTML = '';
	
	// Hide Modal
	toggle_modal(modal);
	

	// Reload content
	load_content(sort, filter);
}

// Load the content for the corresponding page
load_content(sort, 'Not Started');

// Event listener that checks the event target element and switches function routing based on the elements classname
document.on('click', function(e){

	// Event target
	let element = e.target;

	switch(true) {

		// Add button to create a new list/card/task
		case element.classList.contains('create-button'):
			$('body').className = element.dataset.body;
			bodyclass 			= element.dataset.body;

			// If add button of tasks is clicked. set current_card globally to save card index
			bodyclass == 'tasks' ? current_card = element.closest('.card-container').dataset.id : '' ;

			
			// Display modal
			toggle_modal($('.add-modal'));
		break;

		// Modal submit button
		case element.classList.contains('submit-button'):
			data 		= {};
			data.title 	= $('input[name="title"]').value;
			switch(bodyclass) {
				case 'lists':
					ajax_request(data, 'add_list', 'model/listmodel.php');
					break;

				case 'cards':
					data.link 	= list_id;
					ajax_request(data, 'add_card', 'model/cardmodel.php');
					break;

				case 'tasks':
					data.description 	= $('.add-modal textarea').value;
					data.status 		= $('.add-modal .status').value;
					data.duration 		= $('.add-modal input[name="duration"]').value;
					data.card 			= window['cards'][current_card].id

					ajax_request(data, 'add_task', 'model/taskmodel.php');
					break;
			}
			close_modal_reload($('.add-modal'));
		break;

		// Button to open the update modal
		case element.classList.contains('update-button'):

			$('body').className = element.dataset.body;

			// Display modal
			update_modal.toggle()

			// Fill modal fields
			$('.update-modal input[name="title"]').value = element.closest('.single').querySelector('.single-title').innerText;

			if(check_body_class('tasks')) {
				$('.update-modal textarea').value 					= element.closest('.single').querySelector('.single-description').innerText;
				$('.update-modal input[name="duration"]').value 	= element.closest('.single').querySelector('.duration').innerText;
				$('.update-modal select').value 					= element.closest('.single').querySelector('.status').innerText;
			}

			// Hand element index over to modal buttons
			$('.update').dataset.id = element.closest('.single').dataset.id;
			$('.remove').dataset.id = element.closest('.single').dataset.id;

			$('.cancel').on('click', close_modal_reload);

		break;

		// The update button in the update modal
		case element.classList.contains('update'):
			data 					= {};

			// add extra properties to data object when editing task
			if(check_body_class('tasks')){
				data.description 	= update_modal.nodes.description.value;
				data.duration 		= update_modal.nodes.duration.value;
				data.status 		= update_modal.nodes.status.value;
			}

			data.title 				= update_modal.nodes.title.value;
			data.id 				= window[bodyclass][element.dataset.id].id;
			window[bodyclass][element.dataset.id].update(data);

			// switch bodyclass back to cards if task update modal is closed
			if(check_body_class('tasks')){
				bodyclass = 'cards'
				$('body').className = 'cards'
			}			

			// Close modal and reload content
			close_modal_reload($('.update-modal'));
		break;

		// The remove button in the update modal
		case element.classList.contains('remove'):
			data 		= {};
			data.id 	= window[bodyclass][element.dataset.id].id
			window[bodyclass][element.dataset.id].delete(data);

			window[bodyclass].splice(element.dataset.id, 1);

			// Close modal and reload content
			close_modal_reload($('.update-modal'));
		break;

		// The cancel button in the update modal
		case element.classList.contains('cancel'):
			close_modal_reload(element.closest('.modal'))
			break;

		// The close button of any modal
		case element.classList.contains('modal_body_close'):
		console.log('close button');
			close_modal_reload(element.closest('.modal'))
		break;

		// The logout option in the header menu
		case element.classList.contains('logout'):
			data.function = 'logout'
			ajax_request({}, data.function, 'model/usermodel.php');
			window.location.href = root;	
		break;
	}
});

// If the sorting menu element exists, add on click listener to reload content with its sorting string
if($('.sorting-menu')){
	$('.sorting-menu').on('click', function(){
		this.querySelector('.sorting-menu-container').classList.toggle('d-none');
	});

	$$('.sorting-menu-container p').forEach(option => option.on('click', function(){
		// Empty card container
		$('.cards-section').innerHTML = '';

		sort = option.dataset.sort;

		// Load new cards
		load_content(sort, filter);
	}))	
}

// If the sorting menu element exists, add on click listener to reload content with its sorting string
if($('.filter-menu')){
	$('.filter-menu').on('click', function(){
		console.log('click filter');
		this.querySelector('.filter-menu-container').classList.toggle('d-none');
	});

	$$('.filter-menu-container p').forEach(option => option.on('click', function(){
		// Empty card container
		$('.cards-section').innerHTML = '';

		let filter_option = option.dataset.filter;

		// Load new cards
		load_content(sort, filter_option);
	}))	
}
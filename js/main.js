import List from '../class/class.list.js';
import Card from '../class/class.card.js';
import Task from '../class/class.task.js';

function check_body_class(classname){
	$('body').classList.contains(classname) ? (bodyclass = classname) && (response = true) : response = false;
	return response;
}

function load_content(){
	switch(true) {
		case check_body_class('lists'):
			// Instantiate new object from List class, Replace content from html string, Append list to container
			ajax_request(data, 'get_all_lists', 'model/listmodel.php').forEach( function(data, i) {
				lists[i] 	= new List(data);
				let l 		= list_markup;
				l 			= l.replace('%title%', data.title);
				l 			= l.replace('%id%', i);

				$('.lists-section').insertAdjacentHTML( 'beforeend', l );

				$$('.viewlist').forEach(list => list.on('click', function(){
					let id = lists[this.closest('.single').dataset.id].id;
					window.location.href = '//' + root_url + 'cards?list=' + id;
				}));
			});
			break;

		case check_body_class('cards'):
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

				ajax_request(data, 'get_all_tasks', 'model/taskmodel.php').forEach(function(task, i) {

					tasks[tasks.length] 	= new Task(task);
					let t 					= task_markup;
					t 						= t.replace('%title%', 			task.title);
					t 						= t.replace('%id%',  			i);
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

function close_modal_reload(modal){

	// If parameter is not of type DOM element, target Element instead of event.
	modal instanceof Element ? '' : modal = modal.target;

	// Empty HTML wrapper
	$(`.${bodyclass}-section`).innerHTML = '';
	
	// Hide Modal
	toggle_modal(modal);

	// Reload content
	load_content();
}

load_content();

document.on('click', function(e){

	let element = e.target;

	switch(true) {

		case element.classList.contains('create-button'):
			$('body').className = element.dataset.body;

			// Display modal
			toggle_modal($('.add-modal'));
		break;

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
					ajax_request(data, 'add_task', 'model/taskmodel.php');
					break;
			}

			close_modal_reload($('.add-modal'));
		break;

		case element.classList.contains('update-button'):

			$('body').className = element.dataset.body;

			// Display modal
			toggle_modal($('.update-modal'));

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

		case element.classList.contains('update'):
			data 					= {};

			// add extra properties to data object when editing task
			if(check_body_class('tasks')){
				data.description 	= $('.update-modal textarea').value
				data.duration 		= $('.update-modal input[name="duration"]').value;
				data.status 		= $('.update-modal select').value;
			}

			data.title 				= element.closest('.modal').querySelector('input[name="title"]').value;
			data.id 				= window[bodyclass][element.dataset.id].id;
			window[bodyclass][element.dataset.id].update(data);

			// switch bodyclass back to cards
			check_body_class('tasks') ? bodyclass = 'cards' : '' ;
			$('body').className = 'cards'

			// Close modal and reload content
			close_modal_reload($('.update-modal'));
		break;

		case element.classList.contains('remove'):
			data 		= {};
			data.id 	= window[bodyclass][element.dataset.id].id
			window[bodyclass][element.dataset.id].delete(data);

			

			// Close modal and reload content
			close_modal_reload($('.update-modal'));
		break;

		case element.classList.contains('cancel'):
			close_modal_reload(element.closest('.modal'))
			break;

		case element.classList.contains('.modal_body_close'):
			close_modal_reload(element.closest('.modal'))
		break;
	}
});
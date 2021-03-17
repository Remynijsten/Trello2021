var data 			= {};
let cards   		= [];

let card_markup 	=
`<div class="card-container" data-id="%id%">
	<div class="card-container-header">
		<h1 class="card-container-header-title">%title%</h1>
		<span class="card-container-header-menu"><i class="fas fa-ellipsis-h openmenu" aria-hidden="true"></i></span>
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

	update_card(title, id) {
		data 		= {};
		data.id 	= this.id;
		data.title 	= this.title;
		ajax_request(data, 'update_card', 'model/cardmodel.php');	
	}
}

/**
  * Sends post request to the server to receive list rows
  */
function get_all_cards(){
	data.id = list_id;
	load_cards(ajax_request(data, 'get_all_cards', 'model/cardmodel.php'), 'id');
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
		
		// Append card markup to wrapper
		document.querySelector('.cards-section').insertAdjacentHTML( 'beforeend', c );
		
		// Create nodelist from all cards
		let card_elements 	= document.querySelectorAll('.card-container');

		// Receive task data per card and append to card container 
		get_all_tasks(data[i].id, sort).forEach(task => {
			let t 	= task_markup;
			t 		= t.replace('%title%', 			task.title);
			t 		= t.replace('%card%',  			task.card);
			t 		= t.replace('%desc%',  	task.description);

			// Filter card element to append to by comparing task->list to card id
			parent_card = Array.from(card_elements).filter(e => {
				return e.dataset.id == task.card
			});

			// Append to correct card element
			parent_card[0].insertAdjacentHTML( 'beforeend', t );
		});

	}

	/**
	  * Add onclick events to all edit-list buttons
	  */
	// document.querySelectorAll('.openmenu').forEach(menu => menu.addEventListener('click', function(){
	// }));

}

get_all_cards();


var data 	= {};
let cards   = [];
let card_markup =
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
	load_cards(ajax_request(data, 'get_all_cards', 'model/cardmodel.php'));
}

/**
  * Receives server data rows, replaces strings with data and appends markup to the list container
  * @param {object} data - Server data object
  */
function load_cards(data){

	for(let i = 0; i < data.length; i++){
		// Create class instance
		cards[i] 	= new Card(data[i]);
		let c 		= card_markup;
		c 			= c.replace('%title%', data[i].title);
		c 			= c.replace('%id%', i);
		document.querySelector('.cards-section').insertAdjacentHTML( 'beforeend', c );	
	}

	/**
	  * Add onclick events to all edit-list buttons
	  */
	document.querySelectorAll('.openmenu').forEach(menu => menu.addEventListener('click', function(){
	}));

}




let data = {};
let cards = [];
let card_markup = 
`<div class="lists-container">
	<div class="lists-container-item">
		<i class="fas fa-bars" aria-hidden="true"></i>
		<h2 class="lists-container-item-title">%title%</h2>
		<div class="lists-container-item-controls">
			<i class="fas fa-ellipsis-h" aria-hidden="true"></i>
			<span class="lists-container-item-controls-color %color-class%"></span>
		</div>
	</div>
	<div class='lists-container-menu d-none'>
		<p class='update_list' data-list-id='%id%'>Update List</p>
		<p class='remove_list' data-list-id='%id%'>Remove List</p>
	</div>
</div>`;

class List{
	constructor(data){
		this.title 	= data['title'];
		this.color 	= data['color'];
		this.status = data['status'];
		this.order 	= data['order'];
	}

	update_title() {
		ajax_request(data, 'update_list', 'model/listmodel.php')
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
		cards[i] 	= new List(data[i]);
		let c 		= card_markup;
		c 			= c.replace('%title%', data[i].title);
		c 			= c.replace('%color-class%', data[i].color);
		c 			= c.replace('%id%', data[i].id);
		c 			= c.replace('%id%', data[i].id);
		document.querySelector('.main').insertAdjacentHTML( 'beforeend', c );	
	}

}

get_all_lists();

document.querySelectorAll('.fa-ellipsis-h').forEach(menu => menu.addEventListener('click', function(){
	this.closest('.lists-container').querySelector('.lists-container-menu').classList.toggle('d-none');

	// Change modal title to current list title
	// this.closest('.lists-container').querySelector('.modal_body_content input[name="title"]').value = menu.closest('h2').innerText;

	let list_title = menu.closest('.lists-container-item').querySelector('.lists-container-item-title').innerText;
	document.querySelector('.modal_body_content input[name="title"]').value = list_title;

}));

document.querySelector('.add_list').addEventListener('click', function(){
	document.querySelector('.lists-modal').classList.remove('d-none');
	document.querySelector('.lists-modal').classList.add('d-block');
});

Array.from(document.querySelectorAll('.colorpicker')).forEach(color => {

	// dynamically add colors from data-value attribute
	color.style.backgroundColor = color.dataset.value;

	color.addEventListener('click', function(){

		// toggle active class on selected colorpicker div
		document.querySelectorAll('.colorpicker').forEach(color => color.classList.remove('active'))
		this.classList.add('active');

		// add colorbox value to select value
		document.querySelector('select[name="color"]').value = this.dataset.value;
	})
});






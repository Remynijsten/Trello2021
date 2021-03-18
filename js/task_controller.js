var data 			= {};
let tasks   		= [];

let task_markup 	=
`<div class="task-container" data-card="%card%">
	%title%
	<p class="task-container-description">%desc%</p>
	<div class="task-container-controls">
		<span class="task-container-controls-menu"><i class="fas fa-ellipsis-h" aria-hidden="true"></i></span>
	</div>
</div>`;

class Task{
	constructor(data){
		this.title 	= data['title'];
		this.id 	= data['id'];
	}

	remove_task(id) {
		data 	= {};
		data.id = this.id;
		ajax_request(data, 'remove_task', 'model/taskmodel.php');
	}

	update_task(title, id) {
		data 		= {};
		data.id 	= this.id;
		data.title 	= this.title;
		ajax_request(data, 'update_task', 'model/taskmodel.php');	
	}
}

/**
  * Sends post request to the server to receive list rows
  */
function get_all_tasks(card_id, sort){
	data 		= {};
	data.id 	= card_id;
	data.sort 	= sort;
	return ajax_request(data, 'get_all_tasks', 'model/taskmodel.php');
}

/**
  * Receives server data rows, replaces strings with data and appends markup to the list container
  * @param {object} data - Server data object
  */
function load_tasks(data){

	for(let i = 0; i < data.length; i++){
		// Create class instance
		tasks[i] 	= new task(data[i]);
		let c 		= task_markup;
		c 			= c.replace('%title%', data[i].title);
		c 			= c.replace('%card%', data[i].card);


		// document.querySelector('.tasks-section').insertAdjacentHTML( 'beforeend', c );	
	}

	/**
	  * Add onclick events to all edit-list buttons
	  */
	// document.querySelectorAll('.openmenu').forEach(menu => menu.addEventListener('click', function(){
	// }));

}


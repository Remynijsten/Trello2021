var data 			= {};
let tasks   		= [];

let task_markup 	=
`<div class="task-container" data-card="%card%">
	<p class="task-container-title">%title%</p>
	<p class="task-container-description">%desc%</p>
	<div class="row task-info-wrapper">
		<div class="col-3">
			<i class="far fa-clock"></i>
			<p class="duration">%duration%</p>
		</div>
		<div class="col-9">
			<i class="fas fa-info-circle"></i>
			<p class="status">%status%</p>
		</div>
	</div>
	<div class="task-container-controls">
		<span class="task-container-controls-menu"><i class="fas fa-ellipsis-h open-task-menu" aria-hidden="true"></i></span>
	</div>
</div>`;

class Task{
	constructor(data){
		this.title 		= data['title'];
		this.id 		= data['id'];
		this.duration 	= data['duration'];
		this.status 	= data['status'];
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


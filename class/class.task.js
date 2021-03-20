export default class Task{
	constructor(data){
		this.title 			= data['title'];
		this.id 			= data['id'];
		this.duration 		= data['duration'];
		this.description 	= data['description'];
		this.status 		= data['status'];
	}

	create(data) {
		ajax_request(data, 'add_card', 'model/cardmodel.php');
	}

	delete(id) {
		data 	= {};
		data.id = this.id;
		ajax_request(data, 'remove_task', 'model/taskmodel.php');
	}

	update(data) {
		data.id 				= this.id;
		ajax_request(data, 'update_task', 'model/taskmodel.php');	
	}

	empty(){
		$$('.tasks-section').forEach(tasks => tasks.innerHTML = '');
	}
}
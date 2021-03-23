export default class List {
	constructor(data){
		this.title 	= data['title'];
		this.id 	= data['id'];
	}

	create(data) {
		ajax_request(data, 'add_list', 'model/listmodel.php');
	}

	/** 
	  * Removes a list from the database
	  * @params {integer} The row id to remove
	  */
	delete() {
		data.id = this.id;
		ajax_request(data, 'remove_list', 'model/listmodel.php');
	}

	/** 
	  * Updates the title of a list row by id
	  * @params {integer} The row id to update
	  */	
	update(data) {
		ajax_request(data, 'update_list', 'model/listmodel.php');		
	}

	empty(){
		$('.lists-section').innerHTML = '';
	}
}
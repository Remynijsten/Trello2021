export default class Card {
	constructor(data){
		this.title 	= data['title'];
		this.id 	= data['id'];
		this.link 	= data['list'];
		this.user 	= data['user'];
	}

	/** 
	  * Removes a list from the database
	  * @params {integer} The row id to remove
	  */
	delete(id) {
		data.id = this.id;
		ajax_request(data, 'remove_card', 'model/cardmodel.php');
	}

	/** 
	  * Updates the title of a list row by id
	  * @params {integer} The row id to update
	  */	
	update(data) {
		ajax_request(data, 'update_card', 'model/cardmodel.php');		
	}

	return_link(){

	}
}
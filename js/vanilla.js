function ajax(model, method, params, callback){
	params = 'data=' + JSON.stringify(params);

	var xhr = new XMLHttpRequest();
	xhr.open(method, './model/' + model + '.php');
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.onload = function() {
	    if (xhr.status === 200) {
	        callback(xhr.responseText);
	    }
	    else{
	        return false;
	    }
	};
	
	if(params != ''){
		xhr.send(params);
	} else {
		xhr.send(null);
	}
}
let data = {};
data.function = 'get_all_lists';

let ajax = new XMLHttpRequest();
ajax.open("POST", "model/listmodel.php", false);
ajax.send(JSON.stringify( data ));

console.log(JSON.parse(ajax.responseText));
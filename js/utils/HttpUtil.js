var URL = 'http://todo-simple-api.herokuapp.com/todos';

function HttpUtil() {

    this.get = function (cb) {
        var request = new XMLHttpRequest();
        request.open('GET', URL);
        request.send();
        request.addEventListener('load', function () {
            cb(JSON.parse(request.responseText));
        });
    };

    this.post = function (body, cb) {
        var request = new XMLHttpRequest();    
        request.open('POST', URL);
        request.setRequestHeader('Content-Type', 'application/json; charset = utf-8');
        request.send(JSON.stringify(body));
        request.addEventListener('load', function () {
            cb();
        }); 
    };

    this.put = function (id, body, cb) {
        var url = URL + '/' + id;
        var request = new XMLHttpRequest();
    	request.open('PUT', url);
    	request.setRequestHeader('Content-Type', 'application/json; charset = utf-8');
        request.send(JSON.stringify(body));
    	request.addEventListener('load', function () {
    		cb();
        });
    };

    this.delete = function (id, cb) {
    	var url = URL + '/' + id;
        var request = new XMLHttpRequest();
    	request.open('DELETE', url);
    	request.send();
    	request.addEventListener('load', function () {
    		cb();
        });
    };
}

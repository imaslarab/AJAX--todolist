function Render() {
	
	var URL = 'http://todo-simple-api.herokuapp.com/todos';
	var httpUtil = new HttpUtil();
	
	this.init = function(container) {
			httpUtil.get(render);

	}

	function render(todos) {
	
		var container = document.getElementById('todo-list');
		container.innerHTML='';

		todos.data.forEach(function (todo) {		
			var list = document.createElement('LI');
			list.innerHTML = todo.title;
			var deleteBtn = document.createElement('button');;
			deleteBtn.setAttribute('class', 'delete');
			var editBtn = document.createElement('button');;
			editBtn.innerHTML='Done';
			
			list.appendChild(deleteBtn);
			list.appendChild(editBtn);
			container.appendChild(list);	
			deleteBtn.addEventListener('click', function() {
				deleteTodo(todo.id)
			});
			editBtn.addEventListener('click', function() {
				editTodo(todo.id);
				
			});
		});
	}

	function addTodo() {
		var todo = {
			title: document.getElementById('todo').value,
			description: '',
			isComplete: false
		};

		httpUtil.post(todo, function() {
			httpUtil.get(render)
		});		
	}

	function deleteTodo(todoId) {
			httpUtil.delete(todoId, function() {
				httpUtil.get(render); 	
			});
	}

	function editTodo(todoId) {
			var todo = {
				title: 'Completed',
				description: '',
				isComplete: true
			};
			httpUtil.put(todoId, todo, function() {
				httpUtil.get(render); 	
			});
	}
}
function Render() {

	var that = this;
	
	this.URL = 'http://todo-simple-api.herokuapp.com/todos';
	this.httpUtil = new HttpUtil();	

	this.container;
	this.addBtn;
	
	this.init = function(id) {
			that.addBtn = document.getElementById('add-todo');
			that.container = document.getElementById(id);

			that.addBtn.addEventListener('click', function() {
				that.addTodo()
			});
			that.httpUtil.get(that.render);
	}

	this.render = function(todos) {

		that.container.innerHTML='';

		todos.data.forEach(function (todo) {		
			var list = document.createElement('LI');

			var checkBox = document.createElement('input');
			checkBox.type = "checkbox";
			checkBox.setAttribute = ('class', 'check-box');

			var label = document.createElement('label');
			label.innerHTML = todo.title;
			if( checkBox.checked == 'true') {
				label.setAttribute('class', 'completed');
				checkBox.disabled = 'true';
			}

			var deleteBtn = document.createElement('button');
			deleteBtn.setAttribute('class', 'delete');
			var editBtn = document.createElement('button');
			editBtn.setAttribute('class', 'edit');
			
			list.appendChild(checkBox);
			list.appendChild(label);
			list.appendChild(deleteBtn);
			list.appendChild(editBtn);
			that.container.appendChild(list);

			deleteBtn.addEventListener('click', function() {
				that.deleteTodo(todo.id)
			});

			var newInput = document.createElement('input');
			newInput.type = 'text';
			newInput.value = todo.title; 
			
			editBtn.addEventListener('click', function() {
				list.appendChild(newInput);
				
				newInput.addEventListener( 'keyup', function() {
				that.editTodo(todo.id, newInput.value)
				});
								
			});


		});
	}

	this.addTodo = function() {
		var todo = {
			title: document.getElementById('todo').value,
			description: '',
			isComplete: false
		};

		that.httpUtil.post(todo, function() {
			that.httpUtil.get(that.render)
		});		
	}

	this.deleteTodo = function(todoId) {
			alert("Todo is deleted");
			that.httpUtil.delete(todoId, function() {
				that.httpUtil.get(that.render); 	
			});
	}

	this.editTodo = function(todoId, newTitle) {
			var todo = {
				title: newTitle,
				description: '',
				isComplete: false
			};
			that.httpUtil.put(todoId, todo, function() {
				that.httpUtil.get(that.render); 	
			});
	}
}
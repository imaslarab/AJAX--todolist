'use strict';
function Render() {

	var that = this;
	
	var URL = 'http://todo-simple-api.herokuapp.com/todos';
	var httpUtil = new HttpUtil();	

	var container;
	var addBtn;
	
	this.init = function() {
		addBtn = document.getElementById('add-todo');
		container = document.getElementById('todo-list');

		addBtn.addEventListener('click', function() {
			addTodo();
		});

		httpUtil.get(render);
	}

	function render (todos) {
		container.innerHTML = '';

		todos.data.forEach(function (todo) {		
			var list = document.createElement('LI');

			var checkBox = document.createElement('input');
			checkBox.type = 'checkbox';

			var label = document.createElement('label');
			label.innerHTML = todo.title;

			var deleteBtn = document.createElement('button');
			deleteBtn.setAttribute('class', 'delete');

			var editBtn = document.createElement('button');
			editBtn.setAttribute('class', 'edit');
			
			list.appendChild(checkBox);
			list.appendChild(label);
			list.appendChild(deleteBtn);
			list.appendChild(editBtn);
			container.appendChild(list);

			checkBox.addEventListener('change', function() {
				console.log(label);
				if(checkBox.checked) {
					label.setAttribute('class', 'completed');
				}
				else {
					label.setAttribute('class', '');
				}
			});

			deleteBtn.addEventListener('click', function() {
				deleteTodo(todo.id)
			});

			var newInput = document.createElement('input');
			newInput.type = 'text';
			newInput.value = todo.title; 
			
			editBtn.addEventListener('click', function() {
				list.replaceChild(newInput,label);
				
				newInput.addEventListener( 'keypress', function(event) {
					if(event.keyCode == 13) {
						editTodo(todo.id, newInput.value);
					}
				});
								
			});
		});
	}

	function addTodo () {
		var todo = {
			title: document.getElementById('todo').value,
			description: '',
			isComplete: false
		};

		httpUtil.post(todo, function() {
			httpUtil.get(render);
		});		
	}

	function deleteTodo (todoId) {
		alert('Todo is deleted');
		httpUtil.delete(todoId, function() {
			httpUtil.get(render); 	
		});
	}

	function editTodo (todoId, newTitle) {
		var todo = {
			title: newTitle,
			description: '',
			isComplete: false
		};
		httpUtil.put(todoId, todo, function() {
			httpUtil.get(render); 	
		});
	}

}
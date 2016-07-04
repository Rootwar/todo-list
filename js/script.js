(function () {
	"use strict";

	function todos(wrap, text, button) {
		var todosWrap = document.querySelector(wrap),
			todoText = document.querySelector(text),
			todoAdd = document.querySelector(button);

		function createTodo() {
			var li = document.createElement('li'),
				todo = document.createTextNode(todoText.value);

			li.appendChild(todo);
			li.insertAdjacentHTML('beforeend', '<span class="remove"></span> <span class="done"></span>');
			return li;
		}
		
		function saveTodos() {
			if (todosWrap.firstElementChild.children.length) {
				localStorage.setItem('todos', todosWrap.firstElementChild.innerHTML);
			}
			if (localStorage.getItem('todos') !== null) {
				todosWrap.firstElementChild.innerHTML = localStorage.getItem('todos');
			}
		}
		
		function addTodo() {
			var ol = document.createElement('ol');

			todosWrap.appendChild(ol);
			todoAdd.addEventListener("click", function () {
				if (todoText.value.length) {
					ol.appendChild(createTodo());
					todoText.value = '';
					saveTodos();
				}
			});
		}
		
		function removeDoneTodo() {
			todosWrap.addEventListener("click", function (event) {
				var target = event.target,
					remove = document.querySelectorAll('.remove');
				
				if (target.classList.contains("remove")) {
					if (remove.length === 1) {
						localStorage.clear();
						todosWrap.firstElementChild.innerHTML = localStorage.getItem('todos');
					} else {
						target.parentElement.parentElement.removeChild(target.parentElement);
						saveTodos();
					}
				}
				if (target.classList.contains("done")) {
					target.parentElement.classList.add('active');
					saveTodos();
				}
			});
		}

		addTodo();
		removeDoneTodo();
		saveTodos();
	}
	todos('.todo-wrap', '.todo-text', '.todo-add');
}());
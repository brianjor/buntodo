import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TodoService } from './todo.service';
import { ITodo } from '@buntodo/common/defs';
import { ETodoStatus } from '@buntodo/common/enums';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [TodoService],
})
export class AppComponent implements OnInit {
	todos: Signal<ITodo[]>;
	newTodoTitle: string = '';

	constructor(private todoService: TodoService) {
		this.todos = todoService.todos;
	}

	ngOnInit() {
		this.todoService.getTodos();
	}

	onTitleChange(event: Event) {
		const input = event.target as HTMLInputElement;
		this.newTodoTitle = input.value;
	}

	async handleAddTodo() {
		this.todoService.addTodo(this.newTodoTitle);
		this.newTodoTitle = '';
	}

	async handleRemoveTodo(todo: ITodo) {
		this.todoService.removeTodo(todo);
	}

	async handleToggleStatus(todo: ITodo) {
		const newTodo = {
			...todo,
			status:
				todo.status === ETodoStatus.INCOMPLETE
					? ETodoStatus.COMPLETE
					: ETodoStatus.INCOMPLETE,
		};
		this.todoService.editTodo(newTodo);
	}
}

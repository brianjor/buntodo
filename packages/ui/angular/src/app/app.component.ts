import { Component, OnInit } from '@angular/core';
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
	todos: ITodo[] = [];
	newTodoTitle: string = '';

	constructor(private todoService: TodoService) {}

	ngOnInit() {
		this.getTodos();
	}

	getTodos(): void {
		this.todoService.getTodos().subscribe({
			next: (response) => {
				console.log('got todos: ', response.data.todos);
				this.todos = response.data.todos;
			},
			error: (error) => console.error('Error getting todos', error),
		});
	}

	onTitleChange(event: Event) {
		const input = event.target as HTMLInputElement;
		this.newTodoTitle = input.value;
	}

	async handleAddTodo() {
		this.todoService.addTodo(this.newTodoTitle).subscribe({
			next: () => {
				this.newTodoTitle = '';
				this.getTodos();
			},
			error: (error) => console.error('Error adding todo', error),
		});
	}

	async handleRemoveTodo(todo: ITodo) {
		this.todoService.removeTodo(todo).subscribe({
			next: () => this.getTodos(),
			error: (error) => console.error('Error removing todo', error),
		});
	}

	async handleToggleStatus(todo: ITodo) {
		const newTodo = {
			...todo,
			status:
				todo.status === ETodoStatus.INCOMPLETE
					? ETodoStatus.COMPLETE
					: ETodoStatus.INCOMPLETE,
		};
		this.todoService.editTodo(newTodo).subscribe({
			next: () => this.getTodos(),
			error: (error) => console.error('Error editing todo', error),
		});
	}
}

import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ITodo } from '@buntodo/common/defs';
import { ETodoStatus } from '@buntodo/common/enums';

@Injectable({
	providedIn: 'root',
})
export class TodoService {
	private rootUrl = 'http://localhost:8080';
	private _todos = signal<ITodo[]>([]);
	public todos = this._todos.asReadonly();

	constructor(private http: HttpClient) {}

	getTodos() {
		this.http
			.get<{ data: { todos: ITodo[] } }>(`${this.rootUrl}/todos`)
			.subscribe({
				next: (response) => this._todos.set(response.data.todos),
				error: (error) => console.log('Error getting todos', error),
			});
	}

	addTodo(title: string) {
		return this.http
			.post(
				`${this.rootUrl}/todos`,
				JSON.stringify({ title, status: ETodoStatus.INCOMPLETE }),
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)
			.subscribe({
				next: () => this.getTodos(),
				error: (error) => console.error('Error adding todo', error),
			});
	}

	editTodo(todo: ITodo) {
		return this.http
			.put(
				`${this.rootUrl}/todos/${todo.id}`,
				JSON.stringify({ title: todo.title, status: todo.status }),
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)
			.subscribe({
				next: () => this.getTodos(),
				error: (error) => console.error('Error editing todo', error),
			});
	}

	removeTodo(todo: ITodo) {
		return this.http.delete(`${this.rootUrl}/todos/${todo.id}`).subscribe({
			next: () => this.getTodos(),
			error: (error) => console.error('Error removing todo', error),
		});
	}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITodo } from '@buntodo/common/defs';
import { ETodoStatus } from '@buntodo/common/enums';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TodoService {
	private rootUrl = 'http://localhost:8080';

	constructor(private http: HttpClient) {}

	getTodos() {
		return this.http.get<{ data: { todos: ITodo[] } }>(`${this.rootUrl}/todos`);
	}

	addTodo(title: string) {
		return this.http.post(
			`${this.rootUrl}/todos`,
			JSON.stringify({ title, status: ETodoStatus.INCOMPLETE }),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
	}

	editTodo(todo: ITodo) {
		return this.http.put(
			`${this.rootUrl}/todos/${todo.id}`,
			JSON.stringify({ title: todo.title, status: todo.status }),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
	}

	removeTodo(todo: ITodo) {
		return this.http.delete(`${this.rootUrl}/todos/${todo.id}`);
	}
}

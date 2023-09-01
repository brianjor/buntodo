import { ReactiveController, ReactiveControllerHost } from 'lit';
import { ITodo } from '@buntodo/common/defs';
import { ETodoStatus } from '@buntodo/common/enums';

export class TodoController implements ReactiveController {
	private host: ReactiveControllerHost;
	todos: ITodo[] = [];

	constructor(host: ReactiveControllerHost) {
		this.host = host;
		host.addController(this);
	}

	hostConnected(): void {
		/** Empty */
	}

	hostDisconnected(): void {
		/** Empty */
	}

	async getTodos() {
		try {
			const response = await fetch('http://localhost:8080/todos');
			this.todos = (
				(await response.json()) as { data: { todos: ITodo[] } }
			).data.todos;

			this.host.requestUpdate();
		} catch (err) {
			console.log('err:', err);
		}
	}

	async addTodo(title: string) {
		try {
			await fetch('http://localhost:8080/todos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ title, status: ETodoStatus.INCOMPLETE }),
			});
		} catch (err) {
			console.log('err:', err);
		}
	}

	async removeTodo(todo: ITodo) {
		try {
			await fetch(`http://localhost:8080/todos/${todo.id}`, {
				method: 'DELETE',
			});
		} catch (err) {
			console.log('err:', err);
		}
	}
}

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@buntodo/ui-components';
import { TodoController } from './controllers/todoController';
import { ITodo } from '@buntodo/common/defs';

@customElement('app-root')
export default class AppRoot extends LitElement {
	private todoController: TodoController;

	constructor() {
		super();
		this.todoController = new TodoController(this);
	}

	async firstUpdated(): Promise<void> {
		await this.todoController.getTodos();
	}

	async handleAddTodo(event: CustomEvent<string>) {
		await this.todoController.addTodo(event.detail);
		await this.todoController.getTodos();
	}

	async handleRemoveTodo(event: CustomEvent<ITodo>) {
		await this.todoController.removeTodo(event.detail);
		await this.todoController.getTodos();
	}

	render() {
		return html`
			<todo-list-component
				@removeTodo=${this.handleRemoveTodo}
				.todos=${this.todoController.todos}
			></todo-list-component>
			<add-todo-component @addTodo=${this.handleAddTodo}></add-todo-component>
		`;
	}
}

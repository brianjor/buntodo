import { LitElement, html } from 'lit-element';
import { customElement, property } from 'lit/decorators.js';

import { ITodo } from '@buntodo/common/defs';

@customElement('todo-list-component')
export default class TodoListComponent extends LitElement {
	@property({ type: Array })
	todos: ITodo[] = [];

	private handleRemoveTodo = (todo: ITodo) => {
		this.dispatchEvent(new CustomEvent('removeTodo', { detail: todo }));
	};

	private handleToggleStatus = (todo: ITodo) => {
		this.dispatchEvent(new CustomEvent('toggleStatus', { detail: todo }));
	};

	render() {
		return html`
			<table>
				<thead>
					<tr>
						<td>Title</td>
						<td>Status</td>
						<td><!-- Remove column --></td>
					</tr>
				</thead>
				<tbody>
					${this.todos.map(
						(todo) => html`
							<tr>
								<td>${todo.title}</td>
								<td @click=${() => this.handleToggleStatus(todo)}>
									${todo.status}
								</td>
								<td>
									<button @click=${() => this.handleRemoveTodo(todo)}>
										Remove
									</button>
								</td>
							</tr>
						`,
					)}
				</tbody>
			</table>
		`;
	}
}

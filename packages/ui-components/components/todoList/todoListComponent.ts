import { LitElement, html } from 'lit-element';
import { customElement, property } from 'lit/decorators.js';

import { ITodo } from '@buntodo/common/defs';

@customElement('todo-list-component')
export default class TodoListComponent extends LitElement {
	@property({ type: Array })
	todos: ITodo[] = [];

	render() {
		return html`
			<table>
				<thead>
					<tr>
						<td>Title</td>
						<td>Status</td>
					</tr>
				</thead>
				<tbody>
					${this.todos.map(
						(todo) => html`
							<tr>
								<td>${todo.title}</td>
								<td>${todo.status}</td>
							</tr>
						`,
					)}
				</tbody>
			</table>
		`;
	}
}

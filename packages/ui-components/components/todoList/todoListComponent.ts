import { LitElement, html } from 'lit-element';
import { customElement, property } from 'lit/decorators.js';

import { ITodo } from '@buntodo/common/defs';

@customElement('todo-list-component')
export default class TodoListComponent extends LitElement {
	@property({ type: Array })
	todos: ITodo[] = [];

	render() {
		return html`
			<ul>
				${this.todos.map((todo) => html`<li>${todo.title}</li>`)}
			</ul>
		`;
	}
}

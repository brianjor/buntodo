import { LitElement, html } from 'lit-element';
import { customElement, state } from 'lit/decorators.js';

@customElement('add-todo-component')
export default class AddTodoComponent extends LitElement {
	@state()
	title: string = '';

	private handleAddTodo = () => {
		this.dispatchEvent(
			new CustomEvent('addTodo', { detail: this.title, bubbles: true }),
		);
		this.resetTitle();
	};

	private resetTitle = () => {
		this.title = '';
	};

	render() {
		return html`
			<input
				.value=${this.title}
				@change=${(e: InputEvent) => {
					this.title = (e.currentTarget as HTMLInputElement).value;
				}}
			/>
			<button @click=${this.handleAddTodo}>Add</button>
		`;
	}
}

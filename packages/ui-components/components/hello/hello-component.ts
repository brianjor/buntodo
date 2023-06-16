import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("hello-component")
export class Hello extends LitElement {
	@property({ type: String })
	name = "world";

	render() {
		return html`<div>
			Hallo,
			${this
				.name}!
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"hello-component": Hello;
	}
}

export default Hello;

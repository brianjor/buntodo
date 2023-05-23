import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("hello-component")
export class Hello extends LitElement {
	render() {
		return html`<div>Hallo</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"hello-component": Hello;
	}
}

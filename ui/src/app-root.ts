import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("app-root")
export class AppRoot extends LitElement {
	render() {
		return html`Hallo`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"app-root": AppRoot;
	}
}

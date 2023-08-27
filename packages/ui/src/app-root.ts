import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import 'ui-components';

@customElement('app-root')
export class AppRoot extends LitElement {
	render() {
		return html`<hello-component name="User"></hello-component>`;
	}
}

export default AppRoot;

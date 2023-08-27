import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@buntodo/ui-components';
import { ETodoStatus } from '../../common/enums';

@customElement('app-root')
export default class AppRoot extends LitElement {
	render() {
		return html`
			<hello-component name="User"></hello-component>
			<todo-list-component
				.todos=${[
					{ id: 1, title: 'todo 1', status: ETodoStatus.INCOMPLETE },
					{ id: 2, title: 'second todo', status: ETodoStatus.COMPLETE },
				]}
			></todo-list-component>
		`;
	}
}

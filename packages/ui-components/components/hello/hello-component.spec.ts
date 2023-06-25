import { describe, expect, it } from "bun:test";
import HelloComponent from "./hello-component";
import "./hello-component";

describe("MyComponent", () => {
	it("displays 'Hallo, world!'", async () => {
		const expected = "Hallo, world!";
		const el = await new HelloComponentBuilder().build();
		expect(el.name).toEqual("world");
		expect(el.shadowRoot?.querySelector("div")?.innerText).toEqual(expected);
	});

	it("displays 'Hallo, User!", async () => {
		const expected = "Hallo, User!";
		const el = await new HelloComponentBuilder().withName("User").build();
		expect(el.name).toEqual("User");
		expect(el.shadowRoot?.querySelector("div")?.innerText).toEqual(expected);
	});
});

class HelloComponentBuilder {
	private name: string;

	constructor() {
		this.name = "world";
	}

	withName(name: string) {
		this.name = name;
		return this;
	}

	async build() {
		document.body.innerHTML = `<hello-component name=${this.name}></hello-component>`;
		const component = document.body.querySelector(
			"hello-component"
		) as HelloComponent;
		await component.updateComplete;
		return component;
	}
}

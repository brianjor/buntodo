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

	// Array.from({ length: 2000 }, (_, i) => i).forEach((_) => {
	// 	const name = (Math.random() + 1).toString(36).substring(2, 7);
	// 	it(`displays 'Hallo, ${name}!`, async () => {
	// 		const expected = `Hallo, ${name}!`;
	// 		const el = await new HelloComponentBuilder().withName(name).build();
	// 		expect(el.name).toEqual(name);
	// 		expect(el.shadowRoot?.querySelector("div")?.innerText).toEqual(expected);
	// 	});
	// });
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

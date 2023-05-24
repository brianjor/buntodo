import { describe, expect, it } from "bun:test";
import { html } from "lit";
import { fixture } from "@open-wc/testing";
import { Hello } from "../../src/hello-component.js";
import "../../src/hello-component.js";

describe("MyComponent", () => {
	it("displays 'Hallo'", async () => {
		const dom = "<div>Hallo</div>";
		const el = await fixture<Hello>(html`<hello-component></hello-component>`);
		expect(el).shadowDom.to.equal(dom);
	});
});

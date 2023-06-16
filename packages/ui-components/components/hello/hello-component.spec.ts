// bun:test not available for browser tests
// import { describe, expect, it } from "bun:test";
import { expect } from "@esm-bundle/chai";
import { html } from "lit";
import { fixture } from "@open-wc/testing";
import Hello from "./hello-component";
import "./hello-component";


describe("MyComponent", () => {
	it("displays 'Hallo, world!'", async () => {
		const dom = "<div>Hallo, world!</div>";
		const el = await fixture<Hello>(html`<hello-component></hello-component>`);
		expect(el).shadowDom.to.equal(dom);
	});

	it("displays 'Hallo, User!", async () => {
		const dom = "<div>Hallo, User!</div>";
		const el = await fixture<Hello>(
			html`<hello-component name="User"></hello-component>`
		);
		expect(el).shadowDom.to.equal(dom)
		expect(el.name).to.equal("User");
	});
});

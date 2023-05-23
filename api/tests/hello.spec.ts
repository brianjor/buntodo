import { beforeEach, describe, expect, it } from "bun:test";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src";

const BASE_URL = app.hostname + ":" + app.port;

chai.use(chaiHttp);

describe("404", () => {
	it("should 404 on a non-existing route", async () => {
		const res = await chai.request(BASE_URL).get("/thispathdoesntexist");
		expect(res.status).toBe(404);
	});
});

describe("GET /hellobun", () => {
	let getHello = chai.request(BASE_URL).get("/hellobun");
	beforeEach(() => {
		getHello = chai.request(BASE_URL).get("/hellobun");
	});
	it("route should exist", async () => {
		const res = await getHello;
		expect(res.status).not.toBe(404);
	});
	it('should return "Hello Bun!"', async () => {
		const res = await getHello;
		expect(res.status).toBe(200);
		expect(res.text).toBe("Hello Bun!");
	});
});

describe("PUT /helloname", () => {
	let putHello = chai.request(BASE_URL).put("/helloname");
	beforeEach(() => {
		putHello = chai.request(BASE_URL).put("/helloname");
	});
	it("route should exist", async () => {
		const res = await putHello.send({});
		expect(res.status).not.toBe(404);
	});
	it("should respond with 'Hello user'", async () => {
		const res = await putHello.send({ name: "user" });
		expect(res.status).toBe(200);
		expect(res.text).toBe("Hello user");
	});
});

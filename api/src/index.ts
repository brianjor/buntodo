import { addHello, getHellos } from "./controllers/helloController";

const server = Bun.serve({
	port: 8080,
	async fetch(req) {
		const url = new URL(req.url);
		let body: any;
		switch (url.pathname) {
			case "/hellobun":
				return new Response("Hello Bun!");
			case "/helloname":
				body = await req.json();
				if (
					body === null ||
					body === undefined ||
					Array.isArray(body) ||
					typeof body !== "object"
				) {
					return new Response(null, { status: 400 });
				}
				if (!("name" in body)) {
					return new Response(null, { status: 400 });
				}
				return new Response(`Hello ${body.name}`);
			case "/database":
				if (req.method === "POST") {
					body = await req.json();
					addHello(body.hello);
					return new Response(null, { status: 201 });
				} else if (req.method === "GET") {
					const hellos = getHellos();
					return new Response(JSON.stringify(hellos), { status: 200 });
				}
			default:
				return new Response("404", { status: 404 });
		}
	},
});

console.log("Running on port 8080...");

export default server;

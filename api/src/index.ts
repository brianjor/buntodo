import router from "./router.ts";

const server = Bun.serve({
	port: 8080,
	fetch: router,
});

export default server;

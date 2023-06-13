import { Elysia } from "elysia";
import Router from "./router.ts";

const app = new Elysia();

Router.route(app);

app.listen(8080);

export type App = typeof app;

export default app;

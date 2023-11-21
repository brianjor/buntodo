import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import Router from './router.ts';

const port = 8080;
const app = new Elysia();
app.use(cors());

Router.route(app);

app.listen(port, () => {
	console.log(`Started server on http://localhost:${port}`);
});

export type App = typeof app;

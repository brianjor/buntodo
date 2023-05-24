import TodosHandler from "./handlers/todosHandler.ts";
import TodoHandler from "./handlers/todoHandler.ts";
import TodoController from "controllers/todoController.ts";

const controller = new TodoController();
const todoHandler = new TodoHandler(controller);
const todosHandler = new TodosHandler(controller);

const router = async (req: Request): Promise<Response> => {
	try {
		const url = new URL(req.url);
		if (url.pathname === "/todos") {
			return await todosHandler.handle(req);
		}
		const todoMatches = url.pathname.match(/^\/todos\/(\d+)(\/)?$/);
		if (todoMatches !== null) {
			return await todoHandler.handle(req, Number(todoMatches[1]));
		}

		return new Response(null, { status: 404 });
	} catch (e) {
		return new Response(JSON.stringify(e), { status: 500 });
	}
};

export default router;

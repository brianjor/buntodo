import TodosHandler, {
	TodosGetRequestSchema,
	TodosPostRequestSchema,
} from "./handlers/todosHandler.ts";
import TodoHandler, {
	TodoDeleteRequestSchema,
	TodoGetRequestSchema,
	TodoPutRequestSchema,
} from "./handlers/todoHandler.ts";
import TodoController from "controllers/todoController.ts";
import { App } from "index.ts";

const controller = new TodoController();
const todoHandler = new TodoHandler(controller);
const todosHandler = new TodosHandler(controller);

export default class Router {
	static route(app: App) {
		app.group("/todos", (app) =>
			app
				.get("", todosHandler.handleGet, TodosGetRequestSchema)
				.post("", todosHandler.handlePost, TodosPostRequestSchema),
		);
		app.group("/todos/:id", (app) =>
			app
				.get("", todoHandler.handleGet, TodoGetRequestSchema)
				.put("", todoHandler.handlePut, TodoPutRequestSchema)
				.delete("", todoHandler.handleDelete, TodoDeleteRequestSchema),
		);
	}
}

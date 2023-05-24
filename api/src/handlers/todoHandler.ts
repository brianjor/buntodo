import TodoController from "controllers/todoController";
import { PutTodo } from "dto/TodoDto";

class TodoHandler {
	private controller: TodoController;

	constructor(controller: TodoController) {
		this.controller = controller;
	}

	public handle = async (req: Request, id: number): Promise<Response> => {
		const method = req.method;
		switch (method) {
			case "GET":
				return this.handleGet(id);
			case "PUT":
				return await this.handlePut(req);
			case "DELETE":
				return this.handleDelete(id);
		}
		return new Response(null, { status: 404 });
	};

	private handleGet = (id: number) => {
		const todo = this.controller.getTodo(id);
		if (todo === null) {
			return new Response(null, { status: 404 });
		}
		const response = {
			data: {
				todo: todo,
			},
		};
		return new Response(JSON.stringify(response), { status: 200 });
	};

	private handlePut = async (req: Request) => {
		const body = await req.text();
		const todo = PutTodo.fromJson(body);
		this.controller.editTodo(todo);
		return new Response(null, { status: 204 });
	};

	private handleDelete = (id: number) => {
		this.controller.deleteTodo(id);
		return new Response(null, { status: 204 });
	};
}

export default TodoHandler;

import TodoDto, { PostTodo } from "dto/TodoDto";
import TodoController from "../controllers/todoController";

class TodosHandler {
	private controller: TodoController;

	constructor(controller: TodoController) {
		this.controller = controller;
	}

	public handle = async (req: Request): Promise<Response> => {
		const method = req.method;
		switch (method) {
			case "GET":
				return this.handleGet();
			case "POST":
				return await this.handlePost(req);
			default:
				return new Response(null, { status: 404 });
		}
	};

	private handleGet = () => {
		const rawTodos = this.controller.getTodos();
		const todos = rawTodos.map((r) => new TodoDto(r.id, r.title, r.status));
		const response = {
			data: {
				todos: todos,
			},
		};
		return new Response(JSON.stringify(response), {
			status: 200,
		});
	};

	private handlePost = async (req: Request) => {
		const body = await req.text();
		const todo = PostTodo.fromJson(body);
		this.controller.addTodo(todo);
		return new Response(null, { status: 201 });
	};
}

export default TodosHandler;

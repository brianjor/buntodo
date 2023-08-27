import TodoDto from 'dto/TodoDto';
import TodoController from '../controllers/todoController';
import { Context, t } from 'elysia';

export type TodosGetRequestContext = Context<{
	body: undefined;
	params: Record<string, never>;
	query: undefined;
	headers: undefined;
	response: {
		data: { todos: { id: number; title: string; status: string }[] };
	};
}>;

export const TodosGetRequestSchema = {
	body: t.Undefined(),
	response: {
		200: t.Object({
			data: t.Object({
				todos: t.Array(
					t.Object({
						id: t.Number(),
						title: t.String(),
						status: t.String(),
					}),
				),
			}),
		}),
	},
};

export type TodosPostRequestContext = Context<{
	body: {
		title: string;
		status: string;
	};
	params: Record<string, never>;
	query: undefined;
	headers: undefined;
	response: null;
}>;

export const TodosPostRequestSchema = {
	body: t.Object({
		title: t.String({ maxLength: 255 }),
		status: t.String({ maxLength: 32 }),
	}),
	response: {
		201: t.Null(),
	},
};

class TodosHandler {
	private controller: TodoController;

	constructor(controller: TodoController) {
		this.controller = controller;
	}

	public handleGet = ({ set }: TodosGetRequestContext) => {
		const rawTodos = this.controller.getTodos();
		const todos = rawTodos.map((r) => new TodoDto(r.id, r.title, r.status));
		const response = {
			data: {
				todos: todos,
			},
		};
		set.status = 200;
		return response;
	};

	public handlePost = async ({ body, set }: TodosPostRequestContext) => {
		this.controller.addTodo(body);
		set.status = 201;
		return null;
	};
}

export default TodosHandler;

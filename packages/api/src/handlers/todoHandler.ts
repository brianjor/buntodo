import TodoController from "controllers/todoController";
import { Context, t } from "elysia";

export type TodoGetRequestContext = Context<{
	body: undefined;
	params: Record<string, number>;
	query: undefined;
	headers: undefined;
	response:
		| string
		| {
				data: { todo: { id: number; title: string; status: string } };
		  };
}>;

export const TodoGetRequestSchema = {
	body: t.Undefined(),
	response: {
		200: t.Object({
			data: t.Object({
				todo: t.Object({
					id: t.Number(),
					title: t.String(),
					status: t.String(),
				}),
			}),
		}),
		404: t.String(),
	},
};

export type TodoPutRequestContext = Context<{
	body: {
		title: string;
		status: string;
	};
	params: Record<string, never>;
	query: undefined;
	headers: undefined;
	response: null;
}>;

export const TodoPutRequestSchema = {
	body: t.Object({
		title: t.String({ maxLength: 255 }),
		status: t.String({ maxLength: 32 }),
	}),
	response: {
		201: t.Null(),
	},
};

export type TodoDeleteRequestContext = Context<{
	body: undefined;
	params: Record<string, number>;
	query: undefined;
	headers: undefined;
	response: null;
}>;

export const TodoDeleteRequestSchema = {
	body: t.Undefined(),
	response: {
		204: t.Null(),
	},
};

class TodoHandler {
	private controller: TodoController;

	constructor(controller: TodoController) {
		this.controller = controller;
	}

	public handleGet = ({ params, set }: TodoGetRequestContext) => {
		const id = params.id;
		const todo = this.controller.getTodo(id);
		if (todo === null) {
			set.status = 404;
			return `Todo with id ${id} does not exist.`;
		}
		const response = {
			data: {
				todo: todo,
			},
		};
		set.status = 200;
		return response;
	};

	public handlePut = ({ body, params, set }: TodoPutRequestContext) => {
		const id = params.id;
		if (!this.controller.todoExists(id)) {
			this.controller.addTodo(body);
			set.status = 201;
		} else {
			this.controller.editTodo({ id, ...body });
			set.status = 204;
		}
		return null;
	};

	public handleDelete = ({ params, set }: TodoDeleteRequestContext) => {
		const id = params.id;
		this.controller.deleteTodo(id);
		set.status = 204;
		return null;
	};
}

export default TodoHandler;

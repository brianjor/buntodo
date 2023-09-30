import TodoController from 'controllers/todoController';
import { Context, t } from 'elysia';

import { ETodoStatus, TETodoStatus } from '@buntodo/common/enums';

export type TodoGetRequestContext = Context<{
	params: { id: number };
	response:
		| string
		| { data: { todo: { id: number; title: string; status: string } } };
}>;

export const TodoGetRequestSchema = {
	params: t.Object({
		id: t.Numeric(),
	}),
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
		status: TETodoStatus;
	};
	params: { id: number };
}>;

export const TodoPutRequestSchema = {
	body: t.Object({
		title: t.String({ maxLength: 255 }),
		status: t.Enum(ETodoStatus),
	}),
	params: t.Object({
		id: t.Numeric(),
	}),
	response: {
		201: t.Null(),
	},
};

export type TodoDeleteRequestContext = Context<{
	params: { id: number };
	response: null;
}>;

export const TodoDeleteRequestSchema = {
	params: t.Object({
		id: t.Numeric(),
	}),
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

import TodoController from '../controllers/todoController';
import { Context, t } from 'elysia';

import { ETodoStatusPattern, TETodoStatus } from '@buntodo/common/enums';

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
		status: TETodoStatus;
	};
	params: Record<string, never>;
	query: undefined;
	headers: undefined;
	response: undefined;
}>;

export const TodosPostRequestSchema = {
	body: t.Object({
		title: t.String({ maxLength: 255 }),
		status: t.String({ pattern: ETodoStatusPattern }),
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
		const todos = this.controller.getTodos();
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

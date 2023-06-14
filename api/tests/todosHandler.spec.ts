import { afterEach, beforeAll, describe, expect, it } from "bun:test";
import sinon from "sinon";

import TodosHandler, {
	TodosGetRequestContext,
	TodosPostRequestContext,
} from "handlers/todosHandler";
import TodoController from "controllers/todoController";
import { createMockContext } from "./helpers/elysiaHelpers";

describe("TodosHandler", () => {
	let mockTodoController: sinon.SinonStubbedInstance<TodoController>;
	let todosHandler: TodosHandler;

	beforeAll(() => {
		mockTodoController = sinon.createStubInstance(TodoController);
		todosHandler = new TodosHandler(mockTodoController);
	});

	afterEach(() => {
		sinon.reset();
	});

	describe("GET requests", () => {
		it("should handle GET requests", async () => {
			const fakeTodo = { id: 1, title: "fake", status: "Incomplete" };
			const otherFakeTodo = { id: 1, title: "fake 2", status: "Partial" };
			mockTodoController.getTodos.returns([fakeTodo, otherFakeTodo]);
			const context = createMockContext<TodosGetRequestContext>();
			const res = todosHandler.handleGet(context);
			const expected = {
				data: {
					todos: [fakeTodo, otherFakeTodo],
				},
			};
			expect(mockTodoController.getTodos.called).toBe(true);
			expect(context.set.status).toBe(200);
			expect(res).toEqual(expected);
		});
	});

	describe("POST requests", () => {
		it("should handle POST requests", async () => {
			const newTodo = { title: "new Todo", status: "Incomplete" };
			const context = createMockContext<TodosPostRequestContext>({
				body: newTodo,
			});
			const res = await todosHandler.handlePost(context);
			expect(mockTodoController.addTodo.called).toBe(true);
			expect(mockTodoController.addTodo.calledWith(newTodo)).toBe(true);
			expect(context.set.status).toBe(201);
		});
	});
});

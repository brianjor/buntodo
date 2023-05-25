import { afterEach, beforeAll, describe, expect, it } from "bun:test";
import sinon from "sinon";

import TodosHandler from "handlers/todosHandler";
import TodoController from "controllers/todoController";
import { PostTodo } from "dto/TodoDto";

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
			const req = new Request("url", { method: "GET" });
			const res = await todosHandler.handle(req);
			const expected = {
				data: {
					todos: [fakeTodo, otherFakeTodo],
				},
			};
			expect(mockTodoController.getTodos.called).toBe(true);
			expect(res.status).toBe(200);
			expect(await res.json()).toEqual(expected);
		});
	});

	describe("POST requests", () => {
		it("should handle POST requests", async () => {
			const newTodo = { title: "new Todo", status: "Incomplete" };
			const req = new Request("url", {
				body: JSON.stringify(newTodo),
				method: "POST",
			});
			const res = await todosHandler.handle(req);
			expect(mockTodoController.addTodo.called).toBe(true);
			expect(
				mockTodoController.addTodo.calledWith(
					new PostTodo(newTodo.title, newTodo.status)
				)
			).toBe(true);
			expect(res.status).toBe(201);
		});
	});
});

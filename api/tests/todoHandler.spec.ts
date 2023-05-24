import { afterEach, beforeAll, describe, expect, it } from "bun:test";
import sinon from "sinon";

import TodoHandler from "handlers/todoHandler";
import TodoController from "controllers/todoController";

describe("TodoHandler", () => {
	let mockTodoController: sinon.SinonStubbedInstance<TodoController>;
	let todoHandler: TodoHandler;

	beforeAll(() => {
		mockTodoController = sinon.createStubInstance(TodoController);
		todoHandler = new TodoHandler(mockTodoController);
	});

	afterEach(() => {
		sinon.reset();
	});

	describe("GET requests", () => {
		it("should handle GET requests", async () => {
			const fakeTodo = { id: 1, title: "fake", status: "Incomplete" };
			mockTodoController.getTodo.returns(fakeTodo);
			const req = new Request("url", { method: "GET" });
			const res = await todoHandler.handle(req, 1);
			const expected = {
				data: {
					todo: fakeTodo,
				},
			};
			expect(res.status).toBe(200);
			expect(await res.json()).toEqual(expected);
		});
		it("should return 404 if todo doesn't exist", async () => {
			mockTodoController.getTodo.returns(null);
			const req = new Request("url", { method: "GET" });
			const res = await todoHandler.handle(req, 1);
			expect(res.status).toBe(404);
		});
	});

	describe("PUT requests", () => {
		it("should handle PUT requests", async () => {
			const fakeTodo = { id: 1, title: "fake", status: "Incomplete" };
			const req = new Request("url", {
				body: JSON.stringify(fakeTodo),
				method: "PUT",
			});
			const res = await todoHandler.handle(req, 1);
			expect(mockTodoController.editTodo.called).toBeTruthy;
			expect(res.status).toBe(204);
		});
	});

	describe("DELETE requests", () => {
		it("should handle DELETE requests", async () => {
			const req = new Request("url", { method: "DELETE" });
			const res = await todoHandler.handle(req, 1);
			expect(mockTodoController.deleteTodo.called).toBeTruthy;
			expect(mockTodoController.deleteTodo.calledWith(1));
			expect(res.status).toBe(204);
		});
	});
});

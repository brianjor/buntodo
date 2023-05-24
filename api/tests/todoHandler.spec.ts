import { beforeAll, describe, expect, it } from "bun:test";
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
		mockTodoController.getTodo.reset();
	});
});

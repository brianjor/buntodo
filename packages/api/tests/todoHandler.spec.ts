import { afterEach, beforeAll, describe, expect, it } from 'bun:test';
import sinon from 'sinon';

import TodoHandler, {
	TodoDeleteRequestContext,
	TodoGetRequestContext,
	TodoPutRequestContext,
} from 'handlers/todoHandler';
import TodoController from 'controllers/todoController';
import { createMockContext } from './helpers/elysiaHelpers';

describe('TodoHandler', () => {
	let mockTodoController: sinon.SinonStubbedInstance<TodoController>;
	let todoHandler: TodoHandler;

	beforeAll(() => {
		mockTodoController = sinon.createStubInstance(TodoController);
		todoHandler = new TodoHandler(mockTodoController);
	});

	afterEach(() => {
		sinon.reset();
	});

	describe('GET requests', () => {
		it('should handle GET requests', () => {
			const fakeTodo = { id: 1, title: 'fake', status: 'Incomplete' };
			mockTodoController.getTodo.returns(fakeTodo);
			const context = createMockContext<TodoGetRequestContext>({
				params: { id: 1 },
			});
			const res = todoHandler.handleGet(context);
			const expected = {
				data: {
					todo: fakeTodo,
				},
			};
			expect(context.set.status).toBe(200);
			expect(res).toEqual(expected);
		});
		it("should return 404 if todo doesn't exist", () => {
			mockTodoController.getTodo.returns(null);
			const context = createMockContext<TodoGetRequestContext>({
				params: { id: 1 },
			});
			todoHandler.handleGet(context);
			expect(context.set.status).toBe(404);
		});
	});

	describe('PUT requests', () => {
		it('should handle PUT requests', () => {
			const fakeTodo = { id: 1, title: 'fake', status: 'Incomplete' };
			mockTodoController.todoExists.returns(true);
			const context = createMockContext<TodoPutRequestContext>({
				params: { id: 1 },
				body: {
					fakeTodo,
				},
			});
			todoHandler.handlePut(context);
			expect(mockTodoController.editTodo.called).toBe(true);
			expect(context.set.status).toBe(204);
		});

		it("should call addTodo if todo doesn't exist", () => {
			const fakeTodo = { id: 254, title: 'new Todo', status: 'Incomplete' };
			mockTodoController.todoExists.returns(false);
			const context = createMockContext<TodoPutRequestContext>({
				params: { id: 1 },
				body: {
					fakeTodo,
				},
			});
			todoHandler.handlePut(context);
			expect(mockTodoController.addTodo.called).toBe(true);
			expect(context.set.status).toBe(201);
		});
	});

	describe('DELETE requests', () => {
		it('should handle DELETE requests', () => {
			const context = createMockContext<TodoDeleteRequestContext>({
				params: { id: 1 },
			});
			todoHandler.handleDelete(context);
			expect(mockTodoController.deleteTodo.called).toBe(true);
			expect(mockTodoController.deleteTodo.calledWith(1)).toBe(true);
			expect(context.set.status).toBe(204);
		});
	});
});

import { describe, it, beforeEach, expect, afterAll } from 'bun:test';
import { ReactiveElement } from 'lit';
import sinon from 'sinon';

import { TodoController } from './todoController';
import { ITodo } from '@buntodo/common/defs';
import { ETodoStatus } from '@buntodo/common/enums';

describe('todoController', () => {
	const reactiveElementStub = sinon.createStubInstance(ReactiveElement);
	let todoController: sinon.SinonSpiedInstance<TodoController>;
	const fetchStub = sinon.stub(global, 'fetch');

	beforeEach(() => {
		todoController = sinon.spy(new TodoController(reactiveElementStub));
	});

	afterAll(() => {
		sinon.restore();
	});

	describe('getTodos', () => {
		const fakeTodos: ITodo[] = [
			{ title: 'fake todo 1', id: 1, status: ETodoStatus.INCOMPLETE },
		];

		beforeEach(() => {
			fetchStub.resolves(
				new Response(JSON.stringify({ data: { todos: fakeTodos } })),
			);
		});

		it('calls "/todos"', async () => {
			await todoController.getTodos();
			expect(fetchStub.lastCall.firstArg).toEndWith('/todos');
		});
		it('sets todos', async () => {
			await todoController.getTodos();
			const expected = fakeTodos;
			expect(todoController.todos).toStrictEqual(expected);
		});
		it('handles errors', async () => {
			fetchStub.throws('This error should be handled');
			expect(todoController.getTodos).not.toThrow();
		});
	});

	describe('addTodo', () => {
		beforeEach(() => {
			fetchStub.resolves(new Response());
		});
		it('calls "/todos"', async () => {
			await todoController.addTodo('test');
			expect(fetchStub.lastCall.firstArg).toEndWith('/todos');
		});
		it('makes a "POST" call', async () => {
			await todoController.addTodo('test');
			expect(fetchStub.lastCall.args[1]?.method).toBe('POST');
		});
		it('sets correct headers', async () => {
			await todoController.addTodo('test');
			const expectedHeaders = { 'Content-Type': 'application/json' };
			expect(fetchStub.lastCall.args[1]?.headers).toStrictEqual(
				expectedHeaders,
			);
		});
		it('passes the correct body', async () => {
			await todoController.addTodo('test');
			const expected = JSON.stringify({
				title: 'test',
				status: ETodoStatus.INCOMPLETE,
			});
			expect(fetchStub.lastCall.args[1]?.body).toStrictEqual(expected);
		});
		it('handles errors', async () => {
			fetchStub.throws('This error should be handled');
			expect(todoController.addTodo).not.toThrow();
		});
	});

	describe('removeTodo', () => {
		let testTodo: ITodo;

		beforeEach(() => {
			fetchStub.resolves(new Response());
			testTodo = {
				id: 1,
				title: 'test',
				status: ETodoStatus.COMPLETE,
			};
		});
		it('calls "/todos/{id}"', async () => {
			await todoController.removeTodo(testTodo);
			expect(fetchStub.lastCall.firstArg).toEndWith(`/todos/${testTodo.id}`);
		});
		it('makes a "DELETE" call', async () => {
			await todoController.removeTodo(testTodo);
			expect(fetchStub.lastCall.args[1]?.method).toBe('DELETE');
		});
		it('handles errors', async () => {
			fetchStub.throws('This error should be handled');
			expect(todoController.removeTodo).not.toThrow();
		});
	});

	describe('editTodo', () => {
		let testTodo: ITodo;

		beforeEach(() => {
			fetchStub.resolves(new Response());
			testTodo = {
				id: 1,
				title: 'test',
				status: ETodoStatus.COMPLETE,
			};
		});
		it('calls "/todos/{id}"', async () => {
			await todoController.editTodo(testTodo);
			expect(fetchStub.lastCall.firstArg).toEndWith(`/todos/${testTodo.id}`);
		});
		it('makes a "PUT" call', async () => {
			await todoController.editTodo(testTodo);
			expect(fetchStub.lastCall.args[1]?.method).toBe('PUT');
		});
		it('sets correct headers', async () => {
			await todoController.editTodo(testTodo);
			const expectedHeaders = { 'Content-Type': 'application/json' };
			expect(fetchStub.lastCall.args[1]?.headers).toStrictEqual(
				expectedHeaders,
			);
		});
		it('passes the correct body', async () => {
			await todoController.editTodo(testTodo);
			const expected = JSON.stringify({
				title: testTodo.title,
				status: testTodo.status,
			});
			expect(fetchStub.lastCall.args[1]?.body).toStrictEqual(expected);
		});
		it('handles errors', async () => {
			fetchStub.throws('This error should be handled');
			expect(() => todoController.editTodo(testTodo)).not.toThrow();
		});
	});
});

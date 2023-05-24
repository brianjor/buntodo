import Database, { SQLQueryBindings } from "bun:sqlite";
import { getDb } from "database/database";
import { PostTodo, PutTodo } from "../dto/TodoDto";

class TodoController {
	private db: Database;

	constructor() {
		console.log("is this getting called?");
		this.db = getDb();
	}

	public getTodos() {
		return this.db
			.query<{ id: number; title: string; status: string }, SQLQueryBindings[]>(
				"SELECT id, title, status FROM todo;"
			)
			.all();
	}

	public getTodo(id: number) {
		return this.db
			.query<{ id: number; title: string; status: string }, SQLQueryBindings>(
				"SELECT id, title, status FROM todo WHERE id = $id;"
			)
			.get({ $id: id });
	}

	public editTodo(todo: PutTodo) {
		const id = todo.id;
		const title = todo.title;
		const status = todo.status;
		this.db
			.query("UPDATE todo SET title = $title, status = $status WHERE id = $id")
			.run({ $id: id, $title: title, $status: status });
	}

	public addTodo(todo: PostTodo) {
		const title = todo.title;
		const status = todo.status;
		this.db
			.query("INSERT INTO todo (title, status) VALUES ($title, $status);")
			.run({
				$title: title,
				$status: status,
			});
	}

	public deleteTodo(id: number) {
		this.db.query("DELETE FROM todo WHERE id = $id").run({ $id: id });
	}
}

export default TodoController;

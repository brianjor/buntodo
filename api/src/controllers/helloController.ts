import { SQLQueryBindings } from "bun:sqlite";
import { getDb } from "../database/database";

const db = getDb();

export const addHello = (hello: string) => {
	db.query("INSERT INTO hello (name) VALUES (?)").run(hello);
};

export const getHellos = () => {
	const rows = db
		.query<string, SQLQueryBindings[]>("SELECT name from hello")
		.all();
	return rows;
};

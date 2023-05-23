import { Database } from "bun:sqlite";

const db = new Database(":memory:");
let isInit = false;

export const initDb = () => {
	console.log("init database");
	db.query("CREATE TABLE IF NOT EXISTS hello(name CHAR(255));").run();
	isInit = true;
};

export const getDb = () => {
	if (isInit) {
		return db;
	}
	initDb();
	return db;
};

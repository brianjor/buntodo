import { Database } from "bun:sqlite";

const db = new Database(":memory:");
let isInit = false;

const initDb = () => {
	console.debug("init database");
	db.query(
		`
		CREATE TABLE todo(
			id INTEGER PRIMARY KEY,
			title CHAR(255),
			status CHAR(32)
		);
	`
	).run();
	isInit = true;
};

export const getDb = () => {
	if (isInit) {
		return db;
	}
	initDb();
	return db;
};

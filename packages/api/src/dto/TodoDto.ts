export default class TodoDto {
	id: number;
	title: string;
	status: string;

	constructor(id: number, title: string, status: string) {
		this.id = id;
		this.title = title;
		this.status = status;
	}

	static fromJson(json: string) {
		const parsed = JSON.parse(json);
		if (
			(!('id' in parsed) && typeof parsed.id !== 'number') ||
			(!('title' in parsed) && typeof parsed.title !== 'string') ||
			(!('status' in parsed) && typeof parsed.status !== 'string')
		) {
			throw Error('Invalid JSON for TodoDto');
		}
		return new TodoDto(parsed.id, parsed.title, parsed.status);
	}

	toJson() {
		return JSON.stringify(this);
	}
}

export class PostTodo {
	title: string;
	status: string;

	constructor(title: string, status: string) {
		this.title = title;
		this.status = status;
	}

	static fromJson(json: string) {
		const parsed = JSON.parse(json);
		if (
			(!('title' in parsed) && typeof parsed.title !== 'string') ||
			(!('status' in parsed) && typeof parsed.status !== 'string')
		) {
			throw Error('Invalid JSON for PostTodo');
		}
		return new PostTodo(parsed.title, parsed.status);
	}

	toJson() {
		return JSON.stringify(this);
	}
}

export class PutTodo {
	id: number;
	title: string;
	status: string;

	constructor(id: number, title: string, status: string) {
		this.id = id;
		this.title = title;
		this.status = status;
	}

	static fromJson(json: string) {
		const parsed = JSON.parse(json);
		if (
			(!('id' in parsed) && Number.isNaN(Number(parsed.id))) ||
			(!('title' in parsed) && typeof parsed.title !== 'string') ||
			(!('status' in parsed) && typeof parsed.status !== 'string')
		) {
			throw Error('Invalid JSON for PostTodo');
		}
		return new PutTodo(Number(parsed.id), parsed.title, parsed.status);
	}

	toJson() {
		return JSON.stringify(this);
	}
}

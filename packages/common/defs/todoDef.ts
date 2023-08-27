import { ETodoStatus } from '../enums/todoStatus';

export interface ITodo {
	id: number;
	title: string;
	status: ETodoStatus;
}

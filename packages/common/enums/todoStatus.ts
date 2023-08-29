export enum ETodoStatus {
	INCOMPLETE = 'INCOMPLETE',
	COMPLETE = 'COMPLETE',
	PARTIAL = 'PARTIAL',
}

export const ETodoStatusPattern = `(${Object.values(ETodoStatus).join('|')})`;

export type TETodoStatus = `${ETodoStatus}`;

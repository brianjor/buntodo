export function createMockContext<T>(overrides?: object): T {
	return {
		request: new Request('http://mock'),
		headers: {},
		query: {},
		params: {},
		body: {},
		store: {},
		set: {
			headers: {},
			status: undefined,
			redirect: undefined,
		},
		...overrides,
	} as T;
}

export function createMockContext<T>(overrides?: {}): T {
	return {
		request: new Request("mock"),
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

import { esbuildPlugin } from '@web/dev-server-esbuild';

export default ({
	files: 'tests/components/**/*.spec.ts',

	plugins: [
		esbuildPlugin({ ts: true })
	],

	nodeResolve: {
		exportConditions: ['browser', 'development']
	}
});

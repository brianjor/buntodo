import { esbuildPlugin } from '@web/dev-server-esbuild';

export default ({
	files: '**/*.spec.ts',

	plugins: [
		esbuildPlugin({ ts: true, tsconfig: "./tsconfig.json" })
	],

	nodeResolve: {
		exportConditions: ['browser', 'development']
	}
});

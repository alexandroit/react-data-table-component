import terser from '@rollup/plugin-terser';
import { createRequire } from 'node:module';

import config, { plugins } from './rollup.config.common.js';

const require = createRequire(import.meta.url);
const pkg = require('../package.json');

export default Object.assign(config, {
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			exports: 'named',
			sourcemap: true,
		},
	],
	plugins: plugins.concat([terser()]),
});

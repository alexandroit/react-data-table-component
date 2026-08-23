import config, { plugins } from './rollup.config.common.js';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const pkg = require('../package.json');

const packageName = pkg.name.split('/').pop();

export default Object.assign(config, {
	output: {
		name: 'ReactDataTable',
		file: `dist/${packageName}.dev.js`,
		format: 'cjs',
		exports: 'named',
	},
	plugins: plugins.concat([]),
});

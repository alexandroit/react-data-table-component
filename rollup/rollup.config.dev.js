import config, { plugins } from './rollup.config.common';
import pkg from '../package.json';

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

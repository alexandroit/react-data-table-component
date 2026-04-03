import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import visualizer from 'rollup-plugin-visualizer';

export const plugins = [
	resolve({
		browser: true,
		preferBuiltins: true,
		extensions: ['.ts', '.tsx'],
	}),
	typescript({
		tsconfig: './tsconfig.json',
		noEmitOnError: true,
		compilerOptions: {
			noEmit: false,
		},
	}),
	commonjs({
		include: 'node_modules/**',
	}),
	visualizer(),
];

export default {
	input: './src/index.ts',
	external: ['react', 'react-dom', 'styled-components'],
};

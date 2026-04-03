import remarkGfm from 'remark-gfm';

import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
	stories: ['../stories/**/*.@(mdx|stories.@(ts|tsx|js|jsx))'],

	typescript: {
		check: false,
		checkOptions: {},
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: prop => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
		},
	},

	addons: [
		{
			name: '@storybook/addon-webpack5-compiler-babel',
			options: {},
		},
		{
			name: '@storybook/addon-docs',
			options: {
				mdxPluginOptions: {
					mdxCompileOptions: {
						remarkPlugins: [remarkGfm],
					},
				},
			},
		},
		{
			name: '@storybook/addon-essentials',
			options: {},
		},
		{
			name: '@storybook/addon-a11y',
			options: {
				runOnly: {
					type: 'tag',
					values: ['wcag2a', 'wcag2aa'],
				},
			},
		},
	],

	docs: {
		autodocs: true,
	},

	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
};

export default config;

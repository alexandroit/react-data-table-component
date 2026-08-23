import merge from 'deepmerge';
import { Theme, Themes } from './types';

type ThemeMapping = {
	[propertyName: string]: Theme;
};

const unsafeThemeNames = new Set(['__proto__', 'prototype', 'constructor']);

function assertSafeThemeName(name: string): void {
	if (unsafeThemeNames.has(name)) {
		throw new TypeError(`Unsafe theme name: ${name}`);
	}
}

function getOwnTheme(name: string): Theme | undefined {
	const descriptor = Object.getOwnPropertyDescriptor(defaultThemes, name);
	return descriptor ? (descriptor.value as Theme) : undefined;
}

const defaultTheme = {
	text: {
		primary: 'rgba(0, 0, 0, 0.87)',
		secondary: 'rgba(0, 0, 0, 0.54)',
		disabled: 'rgba(0, 0, 0, 0.38)',
	},
	background: {
		default: '#FFFFFF',
	},
	context: {
		background: '#e3f2fd',
		text: 'rgba(0, 0, 0, 0.87)',
	},
	divider: {
		default: 'rgba(0,0,0,.12)',
	},
	button: {
		default: 'rgba(0,0,0,.54)',
		focus: 'rgba(0,0,0,.12)',
		hover: 'rgba(0,0,0,.12)',
		disabled: 'rgba(0, 0, 0, .18)',
	},
	selected: {
		default: '#e3f2fd',
		text: 'rgba(0, 0, 0, 0.87)',
	},
	highlightOnHover: {
		default: '#EEEEEE',
		text: 'rgba(0, 0, 0, 0.87)',
	},
	striped: {
		default: '#FAFAFA',
		text: 'rgba(0, 0, 0, 0.87)',
	},
};

export const defaultThemes: ThemeMapping = {
	default: defaultTheme,
	light: defaultTheme,
	dark: {
		text: {
			primary: '#FFFFFF',
			secondary: 'rgba(255, 255, 255, 0.7)',
			disabled: 'rgba(0,0,0,.12)',
		},
		background: {
			default: '#424242',
		},
		context: {
			background: '#E91E63',
			text: '#FFFFFF',
		},
		divider: {
			default: 'rgba(81, 81, 81, 1)',
		},
		button: {
			default: '#FFFFFF',
			focus: 'rgba(255, 255, 255, .54)',
			hover: 'rgba(255, 255, 255, .12)',
			disabled: 'rgba(255, 255, 255, .18)',
		},
		selected: {
			default: 'rgba(0, 0, 0, .7)',
			text: '#FFFFFF',
		},
		highlightOnHover: {
			default: 'rgba(0, 0, 0, .7)',
			text: '#FFFFFF',
		},
		striped: {
			default: 'rgba(0, 0, 0, .87)',
			text: '#FFFFFF',
		},
	},
};

export function createTheme<T>(name = 'default', customTheme?: T, inherit: Themes = 'default'): Theme {
	assertSafeThemeName(name);
	assertSafeThemeName(inherit);

	const inheritedTheme = getOwnTheme(inherit);
	if (!inheritedTheme) {
		throw new TypeError(`Unknown inherited theme: ${inherit}`);
	}

	const currentTheme = getOwnTheme(name);
	const baseTheme = currentTheme || merge(inheritedTheme, customTheme || {});
	const nextTheme = merge(baseTheme, customTheme || {});

	Object.defineProperty(defaultThemes, name, {
		configurable: true,
		enumerable: true,
		value: nextTheme,
		writable: true,
	});

	return nextTheme;
}

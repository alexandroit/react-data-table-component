import { createTheme, defaultThemes } from '../themes';

describe('createTheme', () => {
	test('it should return the default theme if customTheme is not provided', () => {
		const newTheme = createTheme('whoa');

		expect(newTheme).toEqual(defaultThemes.default);
	});

	test('it should create a new theme that is composed with the default theme', () => {
		const newTheme = createTheme('wow', {
			text: {
				primary: '#',
				secondary: '#',
				disabled: '#',
			},
		});

		expect(defaultThemes.wow).toEqual(newTheme);
	});

	test.each(['__proto__', 'prototype', 'constructor'])('it rejects the unsafe theme name %s', name => {
		expect(() => createTheme(name, { polluted: true })).toThrow(/Unsafe theme name/);
		expect((Object.prototype as { polluted?: boolean }).polluted).toBeUndefined();
	});

	test('it does not copy prototype keys from custom theme input', () => {
		const maliciousTheme = JSON.parse('{"__proto__":{"polluted":true}}');

		createTheme('security-regression', maliciousTheme);

		expect((Object.prototype as { polluted?: boolean }).polluted).toBeUndefined();
	});
});

module.exports =
{
	env:
	{
		browser: true,
		es2021: true,
	},
	extends:
	[
		'eslint:recommended',
		'plugin:vue/essential',
	],
	parserOptions:
	{
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins:
	[
		'vue',
	],
    ignorePatterns:
	[
		'*', // Ignores files in the root directory of the project
		'node_modules/**',
	],
	rules:
	{
	}
};

module.exports = {
	root: true,
	parserOptions: {
		project: `${__dirname}/tsconfig.eslint.json`,
	},
	extends: [
		'airbnb',
		'airbnb-typescript',
	],
	rules: {
		'prettier/prettier': 0,
		'no-tabs': 0,
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
		'react/jsx-props-no-spreading': 0,
		'@typescript-eslint/indent': ['error', 'tab'],
		'@typescript-eslint/no-use-before-define': 0,
		'operator-linebreak': ['error', 'after'],
	},
};

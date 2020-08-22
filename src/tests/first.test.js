import '@testing-library/jest-dom/extend-expect';

describe('true is truthy and false is falsy', () => {
	test('true is truthy', () => {
		expect(true).toBe(true);
	});

	test('false is falsy ', () => {
		expect(false).toBe(false);
	});
});

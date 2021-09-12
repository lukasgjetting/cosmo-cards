import formatDate from '../formatDate';

describe('formatDate', () => {
	it('Formats date in correct format', () => {
		expect(formatDate(new Date('2021-12-24T04:00:00'))).toBe('2021-12-24');
	});

	it('Correctly pads with 0', () => {
		expect(formatDate(new Date('2021-04-02T04:00:00'))).toBe('2021-04-02');
	});
});

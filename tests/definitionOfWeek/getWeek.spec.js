import { getWeek } from '../../src/components/definitionOfWeek'

describe('getWeek function', () => {
	it(`Testing the getWeek function. Expecting to receive the number of the day of the week.
		Taking into account the shift, the first week starts on February 5`, () => {
		expect(getWeek('2024-02-05')).toBe(1)
		expect(getWeek('2024-02-12')).toBe(2)
		expect(getWeek('2024-02-18')).toBe(2)
		expect(getWeek('2024-03-31')).toBe(8)
	})
})

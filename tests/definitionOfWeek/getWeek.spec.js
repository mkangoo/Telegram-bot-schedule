import { getWeekNumber } from '../../src/utils/getWeekNumber'
import { describe, it, expect } from 'vitest'

describe('getWeek function', () => {
	it(`Testing the getWeek function. Expecting to receive the number of the day of the week.
		Taking into account the shift, the first week starts on February 5`, () => {
		expect(getWeekNumber(new Date('2024-02-05'))).toBe(1)
		expect(getWeekNumber(new Date('2024-02-12'))).toBe(2)
		expect(getWeekNumber(new Date('2024-02-18'))).toBe(2)
		expect(getWeekNumber(new Date('2024-03-31'))).toBe(8)
	})
})

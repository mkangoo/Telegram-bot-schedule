import { isCurrentWeekEven } from '../../src/utils/isCurrentWeekEven'

describe('isCurrentWeekEven function', () => {
	it('returns true if the week number is even (given the offset)', () => {
		expect(isCurrentWeekEven('2024-02-05')).toBe(false)
		expect(isCurrentWeekEven('2024-02-12')).toBe(true)
		expect(isCurrentWeekEven('2024-02-18')).toBe(true)
		expect(isCurrentWeekEven('2024-02-11')).toBe(false)
		expect(isCurrentWeekEven('2024-03-31')).toBe(true)
	})
})

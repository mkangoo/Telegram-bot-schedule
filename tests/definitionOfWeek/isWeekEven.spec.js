import { isWeekEven } from '../../src/components/definitionOfWeek'
import { describe, it, expect } from 'vitest'

describe('isWeekEven function', () => {
	it('returns true if the week number is even (given the offset)', () => {
		expect(isWeekEven('2024-02-05')).toBe(false)
		expect(isWeekEven('2024-02-12')).toBe(true)
		expect(isWeekEven('2024-02-18')).toBe(true)
		expect(isWeekEven('2024-02-11')).toBe(false)
		expect(isWeekEven('2024-03-31')).toBe(true)
	})
})

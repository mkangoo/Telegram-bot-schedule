/*
 * Calculates the week number based on the provided date.
 *
 * @param {Date} date - The date for which to calculate the week number.
 * @param {number} SHIFT - The first week in GUU starts from the second week of February
 * @returns {number} - The calculated week number.
 */
export const getWeek = (date, shiftWeek = 0) => {
	const DAYS_IN_WEEK = 7
	const MILLISECONDS_IN_DAY = 86400000
	const JANUARY = 0
	const SHIFT = 5

	const calculateWeekNumber = () => {
		const target = new Date(date)
		const januaryFirst = new Date(target.getFullYear(), JANUARY, 1)
		const daysSinceJanuaryFirst = Math.ceil((target - januaryFirst) / MILLISECONDS_IN_DAY)
		const weekNumber = Math.ceil((daysSinceJanuaryFirst + januaryFirst.getDay()) / DAYS_IN_WEEK)
		return weekNumber - SHIFT + shiftWeek
	}
	return calculateWeekNumber()
}

export const isWeekEven = date => getWeek(date) % 2 === 0

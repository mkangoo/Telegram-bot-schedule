/**
 * Calculates the week number based on the provided date.
 *
 * @param {Date} date - The date for which to calculate the week number.
 *
 * @returns {number} -  The calculated week number.
 */
export const getWeek = date => {
	const DAYS_IN_WEEK = 7
	const MILLISECONDS_IN_DAY = 86400000
	const FEBRUARY = 1

	const calculateWeekNumber = () => {
		const target = new Date(date)
		const februaryFirst = new Date(target.getFullYear(), FEBRUARY, 5)
		const daysSinceFebruaryFirst = Math.ceil((target - februaryFirst) / MILLISECONDS_IN_DAY)
		const weekNumber = Math.ceil(daysSinceFebruaryFirst / DAYS_IN_WEEK)

		return weekNumber
	}
	return calculateWeekNumber()
}

export const isWeekEven = date => getWeek(date) % 2 === 0

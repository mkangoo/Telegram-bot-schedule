/**
 * Determines the type of lesson (lecture or practice) based on the current week.
 *
 * @param {object} event - 		 An object containing information about the lesson.
 *
 * @param {number} currentWeek - The current week number.
 *
 * @returns {string|null} - 	 The type of the lesson, can be 'Лекция', 'Практика', or null if not found.
 */
export const getLessonType = (event, currentWeek) => {
	const { lection = [], practical = [] } = event
	if (lection.includes(currentWeek)) {
		return 'Лекция'
	} else if (practical.includes(currentWeek)) {
		return 'Практика'
	}
	return null
}

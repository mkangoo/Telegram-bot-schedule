/**
 * Formats the lesson information for display to the user.
 *
 * @param {'Лекция' | 'Практика'} lessonType
 *
 * @returns {string} - 	  The formatted lesson information for display.
 */
export const getScheduleOutput = (lessonType, { start, end, title, description, audience }) => {
	// Extract start and end times
	const startTime = start.slice(11, 16)
	const endTime = end.slice(11, 16)

	const lessonTitle = title || ''
	const lessonDescription = description || ''
	const audienceInfo = audience || ''

	// Format lesson information
	return `\n\n⏰ ${startTime} - ${endTime}\n${lessonType}:\n<b>${lessonTitle}</b>\n${lessonDescription}\n${audienceInfo}`
}

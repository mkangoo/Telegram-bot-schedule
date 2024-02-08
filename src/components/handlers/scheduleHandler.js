import { getWeek } from '../definitionOfWeek.js'
import { dataBase } from '../../data/database.js'

const DAY_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MESSAGE = '<b>🎉 Занятий нет, можно отдыхать.</b>'

/**
 * Formats the lesson information for display to the user.
 *
 * @param {string} type - The type of the lesson, can be "Lecture" or "Practice".
 *
 * @returns {string} - 	  The formatted lesson information for display.
 */
const formatLessons = (type, { start, end, title, description, audience }) => {
	// Extract start and end times
	const startTime = start.slice(11, 16)
	const endTime = end.slice(11, 16)

	// Retrieve lesson details or use default values if not provided
	const lessonType = type
	const lessonTitle = title || ''
	const lessonDescription = description || ''
	const audienceInfo = audience || ''

	// Format lesson information
	return `\n\n⏰ ${startTime} - ${endTime}\n${lessonType}:\n<b>${lessonTitle}</b>\n${lessonDescription}\n${audienceInfo}`
}

/**
 * Retrieves information about the lessons for the specified day.
 *
 * @param {string} targetDay -        The target day for which lessons information is required.
 *
 * @param {boolean} shouldShiftWeek - Flag defining today is Sunday and the user has clicked the 'Schedule for tomorrow' button
 *
 * @returns {string} - 		          A formatted string containing lesson information for the specified day.
 */
const getLessonsInfo = (targetDay, shouldShiftWeek) => {
	// Find information about the lessons for the specified day
	const lessonToday = dataBase.find(({ day, events }) => day === targetDay && events)
	// If no lesson information is found for the specified day, return an error message
	if (!lessonToday) return MESSAGE
	// Get the current day of the week
	const getNumberWeek = getWeek(new Date())
	const currentWeek = shouldShiftWeek ? getNumberWeek + 1 : getNumberWeek
	// Format lesson information for the specified day
	const formattedLessons = lessonToday.events
		// Iterate through all lessons for the specified day
		.map(event => {
			const { lection = [], practical = [] } = event
			// Determine the type of lesson (lecture or practice) based on the current day of the week
			const lessonType = lection.includes(currentWeek)
				? 'Лекция'
				: practical.includes(currentWeek)
					? 'Практика'
					: null
			// If the lesson type is determined, format the lesson information; otherwise, return null
			return lessonType ? formatLessons(lessonType, event) : null
		})
		// Remove all null values that may have occurred if the lesson type was not determined
		.filter(info => info !== null)
		// Concatenate the formatted lesson information into a single string
		.join(' ')

	// If all lessons returned null, return MESSAGE
	if (!formattedLessons) return MESSAGE

	return formattedLessons
}

/**
 * Retrieves the schedule for a specific day, considering a shift if necessary.
 *
 * @param {number} shiftDay -         The shift for the 'Schedule for tomorrow' button.
 *                            		  Positive value shifts the schedule forward, negative value shifts it backward.
 *                            		  Default is 0, representing the current day.
 *
 * @param {boolean} shouldShiftWeek - Specifies whether to shift a week forward if today is Sunday.
 *									  Shift only works if today is Sunday and shiftDay === 1
 *
 * @returns {string} - 				  The formatted string containing lesson information for the specified day.
 */
export const getScheduleForDay = (shiftDay = 0) => {
	const currentDay = new Date().getDay()
	const dayIndex = (currentDay + shiftDay) % 7
	let shouldShiftWeek = false
	if (currentDay === 0 && shiftDay === 1) shouldShiftWeek = true
	// Retrieve the schedule for the specified day based on the day index
	return getLessonsInfo(DAY_OF_WEEK[dayIndex], shouldShiftWeek)
}

// Object containing the schedule for each day of the week
export const schedule = {
	monday: {
		lessons: getLessonsInfo('Monday'),
	},
	tuesday: {
		lessons: getLessonsInfo('Tuesday'),
	},
	wednesday: {
		lessons: getLessonsInfo('Wednesday'),
	},
	thursday: {
		lessons: getLessonsInfo('Thursday'),
	},
	friday: {
		lessons: getLessonsInfo('Friday'),
	},
}

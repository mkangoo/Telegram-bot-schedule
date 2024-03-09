import { getWeekNumber } from '../definitionOfWeek.js'
import { dataBase } from '../../data/database.js'

const orderedWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const NO_LESSONS_MESSAGE = '<b>🎉 Занятий нет, можно отдыхать.</b>'

/**
 * Formats the lesson information for display to the user.
 *
 * @param {'Лекция' | 'Практика'} lessonType
 *
 * @returns {string} - 	  The formatted lesson information for display.
 */
const getFormatLessons = (lessonType, { start, end, title, description, audience }) => {
	// Extract start and end times
	const startTime = start.slice(11, 16)
	const endTime = end.slice(11, 16)

	const lessonTitle = title || ''
	const lessonDescription = description || ''
	const audienceInfo = audience || ''

	// Format lesson information
	return `\n\n⏰ ${startTime} - ${endTime}\n${lessonType}:\n<b>${lessonTitle}</b>\n${lessonDescription}\n${audienceInfo}`
}

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

/**
 * Retrieves information about the lessons for the specified day.
 *
 * @param {string} targetDay -        The target day for which lessons information is required.
 *
 * @param {boolean} shouldShiftWeek - Flag defining today is Sunday and the user has clicked the 'Schedule for tomorrow' button
 * @param {unknown} scheduleData
 */
// eslint-disable-next-line max-len
export const getLessonsInfo = (targetDay, shouldShiftWeek = false, scheduleData = dataBase, weekNumber = getWeekNumber(new Date())) => {
	// TODO: Remove assigning default value to scheduleData
	const lessonToday = scheduleData.find(({ day, events }) => day === targetDay && events)
	if (!lessonToday) return NO_LESSONS_MESSAGE

	const currentWeek = shouldShiftWeek ? weekNumber + 1 : weekNumber

	const formattedLessons = lessonToday.events
		.map(event => {
			const lessonType = getLessonType(event, currentWeek)
			return lessonType ? getFormatLessons(lessonType, event) : null
		})
		.filter(info => info !== null)
		.join(' ')

	if (!formattedLessons) return NO_LESSONS_MESSAGE

	return formattedLessons
}

/**
 * Retrieves the schedule for a specific day, considering a shift if necessary.
 *
 * @param {number} shiftDay -         The shift for the 'Schedule for tomorrow' button.
 *                            		  Positive value shifts the schedule forward, negative value shifts it backward.
 *                            		  Default is 0, representing the current day.
 */
export const getDayOfWeek = (shiftDay = 0) => {
	const date = new Date()
	const currentHours = date.getUTCHours()
	date.setUTCHours(currentHours + 3)
	const currentDay = date.getDay()
	const dayIndex = (currentDay + shiftDay) % 7
	let shouldShiftWeek = false
	if (currentDay === 0 && shiftDay === 1) shouldShiftWeek = true
	// Retrieve the schedule for the specified day based on the day index
	return getLessonsInfo(orderedWeekDays[dayIndex], shouldShiftWeek)
}
/**
 * Function to get the weekly schedule.
 * @param {boolean} shiftWeek - Shift of the week
 * @returns {string} - Line with the full weekly schedule
 */
export const getWeekSchedule = shiftWeek => {
	const scheduleWeek = orderedWeekDays
		.filter(day => day !== 'Sunday' && day !== 'Saturday')
		.map(day => {
			const dayOfWeek = getLessonsInfo(day, shiftWeek).trim()
			return `\n🛑 <b>${day}</b>:\n\n ${dayOfWeek}\n`
		})
	return scheduleWeek.join('')
}

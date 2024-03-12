// eslint-disable-next-line import/no-cycle
import { dataBase } from '../../data/schedule.js'
import { NO_LESSONS_MESSAGE, orderedWeekDays } from './constant.js'
import { getLessonType } from './lessonType.js'
import { getWeekNumber } from './weekNumber.js'

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

/**
 * Retrieves information about the lessons for the specified day.
 *
 * @param {string} targetDay - The target day for which lessons information is required.
 * @param {Array} scheduleData - The array of objects containing schedule data.
 * @param {boolean} shouldShiftWeek - Flag defining today is Sunday and the user has clicked the 'Schedule for tomorrow' button.
 * @param {number} weekNumber - The current week number.
 * @returns {string} - Formatted lessons information or NO_LESSONS_MESSAGE if no lessons found.
 */

export function getLessonsForDay(targetDay, scheduleData, shouldShiftWeek = false, weekNumber = getWeekNumber(new Date())) {
	const lessonToday = scheduleData.find(({ day, events }) => day === targetDay && events)
	if (!lessonToday) return NO_LESSONS_MESSAGE

	if (shouldShiftWeek) weekNumber += 1

	const formattedLessons = lessonToday.events
		.map(event => {
			const lessonType = getLessonType(event, weekNumber)
			return lessonType ? getScheduleOutput(lessonType, event) : null
		})
		.filter(info => info !== null)
		.join(' ')

	return formattedLessons || NO_LESSONS_MESSAGE
}

/**
 * Function to get the weekly schedule.
 * @param {boolean} shiftWeek - Shift of the week
 * @returns {string} - Line with the full weekly schedule
 */

export const getFullSchedule = shiftWeek => {
	const scheduleWeek = orderedWeekDays
		.filter(day => day !== 'Sunday' && day !== 'Saturday')
		.map(day => {
			const scheduleDay = getLessonsForDay(day, dataBase, shiftWeek).trim()
			return `\n🛑 <b>${day}</b>:\n\n ${scheduleDay}\n`
		})
	return scheduleWeek.join()
}

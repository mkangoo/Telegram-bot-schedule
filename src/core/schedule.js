// eslint-disable-next-line import/no-cycle
import { orderedWeekDays, NO_LESSONS_MESSAGE } from '../utils/constant.js'
import { getLessonType } from '../utils/lessonType.js'
import { getWeekNumber } from '../utils/weekNumber.js'
import { dataBase } from '../../data/schedule.js'

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
	return scheduleWeek.join('')
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
	// Time zone offset in Moscow
	date.setUTCHours(currentHours + 3)
	const currentDay = date.getDay()
	const dayIndex = (currentDay + shiftDay) % 7
	let shouldShiftWeek = false
	if (currentDay === 0 && shiftDay === 1) shouldShiftWeek = true
	// Retrieve the schedule for the specified day based on the day index
	return getLessonsForDay(orderedWeekDays[dayIndex], dataBase, shouldShiftWeek)
}

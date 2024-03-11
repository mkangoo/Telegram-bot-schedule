import { getWeekNumber } from './weekNumber.js'
import { getScheduleOutput } from './scheduleOutput.js'
import { getLessonType } from './lessonType.js'
import { dataBase } from '../../data/schedule.js'

export const orderedWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const NO_LESSONS_MESSAGE = '<b>🎉 Занятий нет, можно отдыхать.</b>'

/**
 * Retrieves information about the lessons for the specified day.
 *
 * @param {string} targetDay -        The target day for which lessons information is required.
 *
 * @param {boolean} shouldShiftWeek - Flag defining today is Sunday and the user has clicked the 'Schedule for tomorrow' button
 * @param {unknown} scheduleData
 */
// eslint-disable-next-line max-len
// TODO: Remove assigning default value to scheduleData
//TODO: Refactoring function
export const getLessonsInfo = (targetDay, scheduleData, shouldShiftWeek = false, weekNumber = getWeekNumber(new Date())) => {
	const lessonToday = scheduleData.find(({ day, events }) => day === targetDay && events)
	if (!lessonToday) return NO_LESSONS_MESSAGE

	const currentWeek = shouldShiftWeek ? weekNumber + 1 : weekNumber

	const formattedLessons = lessonToday.events
		.map(event => {
			const lessonType = getLessonType(event, currentWeek)
			return lessonType ? getScheduleOutput(lessonType, event) : null
		})
		.filter(info => info !== null)
		.join(' ')

	if (!formattedLessons) return NO_LESSONS_MESSAGE

	return formattedLessons
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
			const scheduleDay = getLessonsInfo(day, dataBase, shiftWeek).trim()
			return `\n🛑 <b>${day}</b>:\n\n ${scheduleDay}\n`
		})
	return scheduleWeek.join()
}

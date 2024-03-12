import { dataBase } from '../../data/schedule.js'
import { orderedWeekDays } from './constant.js'
import { getLessonsForDay } from './scheduleOutput.js'

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

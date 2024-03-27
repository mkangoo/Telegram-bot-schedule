// eslint-disable-next-line import/no-cycle
import { orderedWeekDays, NO_LESSONS_MESSAGE } from '../utils/constant.js'
import { getLessonType } from '../utils/lessonType.js'
import { getWeekNumber } from '../utils/weekNumber.js'
import { dataBase } from '../../data/schedule.js'

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

export function getLessonsForDay(targetDay, scheduleData, shouldShiftWeek, weekNumber = getWeekNumber(new Date())) {
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

export const getFullSchedule = shiftWeek => {
	const scheduleWeek = orderedWeekDays
		.filter(day => day !== 'Sunday' && day !== 'Saturday')
		.map(day => {
			const scheduleDay = getLessonsForDay(day, dataBase, shiftWeek).trim()
			return `\n🛑 <b>${day}</b>:\n\n ${scheduleDay}\n`
		})
	return scheduleWeek.join('')
}

const getDayIndex = () => {
	return {
		today() {
			const date = new Date()
			const currentHours = date.getUTCHours()
			// Time zone offset in Moscow
			date.setUTCHours(currentHours + 3)
			const currentDay = date.getDay()
			const dayIndex = currentDay % 7
			return dayIndex % 7
		},
		tomorrow() {
			return this.today() + 1
		},
	}
}

const holidayStatus = () => {
	const dayIndex = getDayIndex().today()
	return orderedWeekDays[dayIndex] === 'Sunday'
}

export const getTodaySchedule = () => {
	const dayIndex = getDayIndex().today()
	return getLessonsForDay(orderedWeekDays[dayIndex], dataBase)
}

export const getTomorrowSchedule = () => {
	const dayIndex = getDayIndex().tomorrow()
	return getLessonsForDay(orderedWeekDays[dayIndex], dataBase, { raw: holidayStatus() })
}

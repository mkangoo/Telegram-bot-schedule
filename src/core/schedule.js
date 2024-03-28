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

export function getLessonsForDay(targetDay, scheduleData, weekNumber = getWeekNumber(new Date())) {
	const lessonToday = scheduleData.find(({ day, events }) => day === targetDay && events)
	if (!lessonToday) return NO_LESSONS_MESSAGE

	const formattedLessons = lessonToday.events
		.map(event => {
			const lessonType = getLessonType(event, weekNumber)
			return lessonType ? getScheduleOutput(lessonType, event) : null
		})
		.filter(info => info !== null)
		.join(' ')
	return formattedLessons || NO_LESSONS_MESSAGE
}

export const getFullSchedule = weekNumber => {
	const scheduleWeek = orderedWeekDays
		.filter(day => day !== 'Sunday' && day !== 'Saturday')
		.map(day => {
			const scheduleDay = getLessonsForDay(day, dataBase, weekNumber).trim()
			return `\n🛑 <b>${day}</b>:\n\n ${scheduleDay}\n`
		})
	return scheduleWeek.join('')
}

export const checkIsSunday = dayIndex => {
	return orderedWeekDays[dayIndex] === 'Sunday'
}

export const getTodayIndex = date => {
	// Time zone offset in Moscow
	const timeOffset = 3
	const currentHours = date.getUTCHours()
	date.setUTCHours(currentHours + timeOffset)
	const currentDay = date.getDay()
	const dayIndex = currentDay % 7
	return dayIndex % 7
}

export const getTomorrowIndex = date => {
	return getTodayIndex(date) + 1
}

export const getTodaySchedule = () => {
	const dayIndex = getTodayIndex(new Date())
	return getLessonsForDay(orderedWeekDays[dayIndex], dataBase)
}

export const getTomorrowSchedule = () => {
	const lastDayIndex = getTomorrowIndex(new Date())
	const isSunday = checkIsSunday(getTodayIndex(new Date()))
	return getLessonsForDay(orderedWeekDays[lastDayIndex], dataBase, isSunday ? getWeekNumber(new Date()) + 1 : getWeekNumber(new Date()))
}

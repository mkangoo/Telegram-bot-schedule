import { getWeek } from '../definitionOfWeek.js'
import { dataBase } from '../../data/database.js'

const MESSAGE = '<b>🎉 Занятий нет, можно отдыхать.</b>'

/*
 * Formats the lesson information for display to the user.
 *
 * @param {string} type - The type of the lesson, can be "Lecture" or "Practice".
 *
 * @param {object} event - An object containing information about the lesson,
 *  including start and end times, title, description, and classroom.
 *
 * @returns {string} - The formatted lesson information for display.
 */
const formatLessons = (type, event) => {
	const startTime = event.start.slice(11, 16)
	const endTime = event.end.slice(11, 16)
	const lessonType = type === 'Лекция' ? 'Лекция' : type === 'Практика' ? 'Практика' : ''
	const lessonTitle = event.title || ''
	const lessonDescription = event.description || ''
	const audience = event.class || ''
	return `\n\n⏰ ${startTime} - ${endTime}\n${lessonType}:\n<b>${lessonTitle}</b>\n${lessonDescription}\n${audience}`
}

/*
 * Retrieves information about the lessons for the specified day.
 *
 * @param {string} targetDay - The target day for which lessons information is required.
 * @param {Array} lessons - An array containing the lessons data.
 * @returns {Array} - An array of formatted lesson information for the specified day.
 */
const getLessonsInfo = (targetDay, dataLessons) => {
	const lessonToday = dataLessons.find(days => days.day === targetDay)
	if (!lessonToday || !lessonToday.events) return MESSAGE
	const today = getWeek(new Date())
	const lessonsInfo = lessonToday.events.map(event => {
		const lection = event.lection || []
		const practical = event.practical || []
		const lessonType = lection.includes(today) ? 'Лекция' : practical.includes(today) ? 'Практика' : null
		return lessonType ? formatLessons(lessonType, event) : null
	})
	return lessonsInfo.filter(info => info !== null)
}

/*
 * @param {number} shiftDay - Сдвиг для кнопки 'Расписание на завтра'
 */
export const getScheduleForDay = (shiftDay = 0) => {
	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	const currentDate = new Date()
	const dayIndex = (currentDate.getDay() + shiftDay) % 7

	if (dayIndex === 0 || dayIndex === 6) {
		return MESSAGE
	}
	return getLessonsInfo(daysOfWeek[dayIndex], dataBase).join(' ')
}

const getDailySchedule = (dayOfWeek, data) => {
	const lessonsInfo = getLessonsInfo(dayOfWeek, data)
	return lessonsInfo.length > 0 ? lessonsInfo.join(' ') : MESSAGE
}

// Object containing the schedule for each day of the week
export const schedule = {
	monday: {
		lessons: getDailySchedule('Monday', dataBase),
	},
	tuesday: {
		lessons: getDailySchedule('Tuesday', dataBase),
	},
	wednesday: {
		lessons: getDailySchedule('Wednesday', dataBase),
	},
	thursday: {
		lessons: getDailySchedule('Thursday', dataBase),
	},
	friday: {
		lessons: getDailySchedule('Friday', dataBase),
	},
}

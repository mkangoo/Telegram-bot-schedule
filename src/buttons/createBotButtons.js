import { Markup } from 'telegraf'

export const getButtonDaysOfWeek = weekOffset => {
	const statusOffset = JSON.parse(Object.values(weekOffset).join())
	return Markup.inlineKeyboard([
		[Markup.button.callback('Понедельник', statusOffset ? 'btnMondayNextWeek' : 'btnMonday')],
		[Markup.button.callback('Вторник', statusOffset ? 'btnTuesdayNextWeek' : 'btnTuesday')],
		[Markup.button.callback('Среда', statusOffset ? 'btnWednesdayNextWeek' : 'btnWednesday')],
		[Markup.button.callback('Четверг', statusOffset ? 'btnThursdayNextWeek' : 'btnThursday')],
		[Markup.button.callback('Пятница', statusOffset ? 'btnFridayNextWeek' : 'btnFriday')],
	])
}

export const createUrlBtn = () => {
	return Markup.inlineKeyboard([
		[Markup.button.url('Проверить на сайте', 'https://my.guu.ru/student/classes/mobile')],
		[Markup.button.url('Скачать расписание', 'https://guu.ru/student/schedule/')],
	])
}

import { Markup } from 'telegraf'

export const getButtonDaysOfWeek = statusOffset => {
	const { weekOffset } = statusOffset
	return Markup.inlineKeyboard([
		[Markup.button.callback('Понедельник', weekOffset ? 'btnMondayNextWeek' : 'btnMonday')],
		[Markup.button.callback('Вторник', weekOffset ? 'btnTuesdayNextWeek' : 'btnTuesday')],
		[Markup.button.callback('Среда', weekOffset ? 'btnWednesdayNextWeek' : 'btnWednesday')],
		[Markup.button.callback('Четверг', weekOffset ? 'btnThursdayNextWeek' : 'btnThursday')],
		[Markup.button.callback('Пятница', weekOffset ? 'btnFridayNextWeek' : 'btnFriday')],
	])
}

export const createUrlBtn = () => {
	return Markup.inlineKeyboard([
		[Markup.button.url('Проверить на сайте', 'https://my.guu.ru/student/classes/mobile')],
		[Markup.button.url('Скачать расписание', 'https://guu.ru/student/schedule/')],
	])
}

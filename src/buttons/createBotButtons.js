import { Markup } from 'telegraf'

export const getButtonDaysOfWeek = btnNextWeek => {
	return Markup.inlineKeyboard([
		[Markup.button.callback('Понедельник', btnNextWeek ? 'btnMondayNextWeek' : 'btnMonday')],
		[Markup.button.callback('Вторник', btnNextWeek ? 'btnTuesdayNextWeek' : 'btnTuesday')],
		[Markup.button.callback('Среда', btnNextWeek ? 'btnWednesdayNextWeek' : 'btnWednesday')],
		[Markup.button.callback('Четверг', btnNextWeek ? 'btnThursdayNextWeek' : 'btnThursday')],
		[Markup.button.callback('Пятница', btnNextWeek ? 'btnFridayNextWeek' : 'btnFriday')],
	])
}

export const createUrlBtn = () => {
	return Markup.inlineKeyboard([
		[Markup.button.url('Проверить на сайте', 'https://my.guu.ru/student/classes/mobile')],
		[Markup.button.url('Скачать расписание', 'https://guu.ru/student/schedule/')],
	])
}

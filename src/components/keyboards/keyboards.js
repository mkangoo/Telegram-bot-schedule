import { Markup } from 'telegraf'

export const getMainMenu = () => {
	return Markup.keyboard([['Сегодня', 'Завтра'], ['Текущая неделя'], ['Следующая неделя']]).resize()
}

export const weekdaySelector = btnNextWeek => {
	return Markup.inlineKeyboard([
		[Markup.button.callback('Понедельник', btnNextWeek ? 'btnMonNextWeek' : 'btnMon')],
		[Markup.button.callback('Вторник', btnNextWeek ? 'btnTueNextWeek' : 'btnTue')],
		[Markup.button.callback('Среда', btnNextWeek ? 'btnWedNextWeek' : 'btnWed')],
		[Markup.button.callback('Четверг', btnNextWeek ? 'btnThuNextWeek' : 'btnThu')],
		[Markup.button.callback('Пятница', btnNextWeek ? 'btnFriNextWeek' : 'btnFri')],
	])
}

export const createUrlBtn = () => {
	return Markup.inlineKeyboard([[Markup.button.url('Проверить на сайте', 'https://guu.ru/student/schedule/')]])
}

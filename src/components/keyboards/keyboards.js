import { Markup } from 'telegraf'

export const getMainMenu = () => {
	return Markup.keyboard([['Сегодня', 'Завтра'], ['Текущая неделя'], ['Следующая неделя']]).resize()
}

export const weekdaySelector = () => {
	return Markup.inlineKeyboard([
		[Markup.button.callback('Понедельник', 'btnMon')],
		[Markup.button.callback('Вторник', 'btnTue')],
		[Markup.button.callback('Среда', 'btnWed')],
		[Markup.button.callback('Четверг', 'btnThu')],
		[Markup.button.callback('Пятница', 'btnFri')],
	])
}

export const createUrlBtn = () => {
	return Markup.inlineKeyboard([[Markup.button.url('Проверить на сайте', 'https://guu.ru/student/schedule/')]])
}

import { Markup } from 'telegraf'

export const getInlineKeyboard = () => {
	return Markup.keyboard([['Сегодня', 'Завтра'], ['Текущая неделя'], ['Следующая неделя']]).resize()
}

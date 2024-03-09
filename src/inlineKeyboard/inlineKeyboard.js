import { Markup } from 'telegraf'

export const getMainMenu = () => {
	return Markup.keyboard([['Сегодня', 'Завтра'], ['Текущая неделя'], ['Следующая неделя']]).resize()
}

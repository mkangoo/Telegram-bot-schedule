import { getDayOfWeek } from '../utils/dayOfWeek.js'
import { createUrlBtn, getButtonDaysOfWeek } from '../buttons/createBotButtons.js'

export default async bot => {
	const getHandlerInlineKeyboard = {
		getScheduleToday: async ctx => {
			ctx.replyWithHTML(await getDayOfWeek(), createUrlBtn())
		},
		getScheduleForTomorrow: async ctx => {
			ctx.replyWithHTML(await getDayOfWeek(1), createUrlBtn())
		},
		getScheduleWeek: ctx => {
			ctx.replyWithHTML('<b>Выберите день:</b>', getButtonDaysOfWeek())
		},
		getScheduleNextWeek: ctx => {
			ctx.replyWithHTML('<b>Выберите день:</b>', getButtonDaysOfWeek(true))
		},
	}
	// TODO: renaming variable
	const orderedInline = [
		{ command: 'Сегодня', handler: getHandlerInlineKeyboard.getScheduleToday },
		{ command: 'Завтра', handler: getHandlerInlineKeyboard.getScheduleForTomorrow },
		{ command: 'Текущая неделя', handler: getHandlerInlineKeyboard.getScheduleWeek },
		{ command: 'Следующая неделя', handler: getHandlerInlineKeyboard.getScheduleNextWeek },
	]

	orderedInline.forEach(({ command, handler }) => {
		bot.hears(command, handler)
	})
}

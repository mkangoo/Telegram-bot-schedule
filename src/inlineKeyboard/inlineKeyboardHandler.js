import { createUrlBtn, getButtonDaysOfWeek } from '../buttons/createBotButtons.js'
import { getTodaySchedule, getTomorrowSchedule } from '../core/schedule.js'

export default async bot => {
	const getHandlerInlineKeyboard = {
		getScheduleToday: async ctx => {
			ctx.replyWithHTML(await getTodaySchedule(), createUrlBtn())
		},
		getScheduleForTomorrow: async ctx => {
			ctx.replyWithHTML(await getTomorrowSchedule(), createUrlBtn())
		},
		getScheduleWeek: ctx => {
			ctx.replyWithHTML('<b>Выберите день:</b>', getButtonDaysOfWeek({ weekOffset: false }))
		},
		getScheduleNextWeek: ctx => {
			ctx.replyWithHTML('<b>Выберите день:</b>', getButtonDaysOfWeek({ weekOffset: true }))
		},
	}

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

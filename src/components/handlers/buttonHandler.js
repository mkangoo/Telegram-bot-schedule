import { weekdaySelector, createUrlBtn } from '../keyboards/keyboards.js'
import { getDayOfWeek } from './scheduleHandler.js'

export const handlerReplyBtn = {
	scheduleToday: ctx => {
		ctx.replyWithHTML(getDayOfWeek(), createUrlBtn())
	},
	scheduleForTomorrow: ctx => {
		ctx.replyWithHTML(getDayOfWeek(1), createUrlBtn())
	},
	scheduleWeek: ctx => {
		ctx.replyWithHTML('<b>Выберите день:</b>', weekdaySelector())
	},
	scheduleNextWeek: ctx => {
		ctx.replyWithHTML('<b>Выберите день:</b>', weekdaySelector(true))
	},
}

export function addButtonAction(bot, button, schedule) {
	bot.action(button, async ctx => {
		try {
			await ctx.answerCbQuery()
			await ctx.replyWithHTML(schedule, createUrlBtn())
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
		}
	})
}

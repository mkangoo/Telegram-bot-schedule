import { dataBase } from '../../data/schedule.js'
import { getLessonsForDay } from '../core/schedule.js'
import { createUrlBtn } from './createBotButtons.js'
import { orderedWeekDays } from '../utils/constant.js'

export default async bot => {
	const addButtonAction = async (bot, button, schedule) => {
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

	orderedWeekDays.forEach(day => {
		addButtonAction(bot, `btn${day}`, getLessonsForDay(day, dataBase, { weekOffset: false }))
		addButtonAction(bot, `btn${day}NextWeek`, getLessonsForDay(day, dataBase, { weekOffset: true }))
	})
}

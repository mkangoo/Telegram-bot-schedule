import { dataBase } from '../../data/schedule.js'
import { getLessonsInfo } from '../utils/scheduleHandler.js'
import { createUrlBtn } from './createBotButtons.js'

const orderedWeekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export default async bot => {
	// eslint-disable-next-line no-shadow
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
		addButtonAction(bot, `btn${day}`, getLessonsInfo(day, dataBase, false))
		addButtonAction(bot, `btn${day}NextWeek`, getLessonsInfo(day, dataBase, true))
	})
}

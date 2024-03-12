import { greetingMessage, contactInfo } from './replyTemplates.js'
import { createUrlBtn } from '../buttons/createBotButtons.js'
import { getInlineKeyboard } from '../inlineKeyboard/createInlineKeyboard.js'
import { getWeekNumber } from '../utils/weekNumber.js'
import { isCurrentWeekEven } from '../utils/isCurrentWeekEven.js'
import { getFullSchedule } from '../utils/scheduleOutput.js'

/** @param {import('telegraf').Telegraf} bot*/
export default async bot => {
	const startHandler = ctx => {
		const user = ctx.from
		const userName = user.first_name
		const pseudonym = user.username
		const greetingName = userName || pseudonym
		ctx.reply(`Привет, ${greetingName}!\n${greetingMessage}`, getInlineKeyboard())
	}
	/** @param {boolean} shiftWeek */
	const getWeekScheduleHandler = (shiftWeek = false) => {
		return ctx => {
			ctx.replyWithHTML(getFullSchedule(shiftWeek), createUrlBtn())
		}
	}
	const getWeekInfoHandler = ctx => {
		const date = new Date()
		const week = isCurrentWeekEven(date) ? 'Четная' : 'Нечетная'
		ctx.replyWithHTML(`📆Сейчас <b>${week}</b> неделя\n📆Номер недели: <b>${getWeekNumber(new Date())}</b>`)
	}
	const getSupportHandler = ctx => ctx.reply(contactInfo)

	const commands = [
		{ command: 'start', handler: startHandler, description: 'Запустить бота' },
		{ command: 'week', handler: getWeekInfoHandler, description: 'Какая сейчас неделя' },
		{ command: 'week_schedule', handler: getWeekScheduleHandler(), description: 'Расписание на эту неделю' },
		{ command: 'next_week_schedule', handler: getWeekScheduleHandler(true), description: 'Расписание на следующую неделю' },
		{ command: 'support', handler: getSupportHandler, description: 'Написать в поддержку' },
	]

	commands.forEach(({ command, handler }) => {
		bot.command(command, ctx => handler(ctx))
	})

	const preparedToSetCommands = commands.map(({ command, description }) => ({
		command,
		description,
	}))
	bot.telegram.setMyCommands(preparedToSetCommands)
}

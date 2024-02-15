import { greetingMessage } from '../greetings.js'
import { getMainMenu } from '../components/keyboards/keyboards.js'
import { getWeek, isWeekEven } from '../components/definitionOfWeek.js'
import { contactInfo } from '../contactMe.js'
import { handlerReplyBtn } from '../components/handlers/buttonHandler.js'

/** @param {import('telegraf').Telegraf} bot*/
export default bot => {
	const startHandler = ctx => {
		const user = ctx.from
		const userName = user.first_name
		const pseudonym = user.username
		const greetingName = userName || pseudonym
		ctx.reply(`Привет, ${greetingName}!\n${greetingMessage}`, getMainMenu())
	}
	const getWeekScheduleHandler = ctx => handlerReplyBtn.scheduleWeek(ctx)
	const getWeekInfoHandler = ctx => {
		const date = new Date()
		const week = isWeekEven(date) ? 'Четная' : 'Нечетная'
		ctx.replyWithHTML(`📆Сейчас <b>${week}</b> неделя\n📆Номер недели: <b>${getWeek(new Date())}</b>`)
	}
	const getSupportHandler = ctx => ctx.reply(contactInfo)

	const commands = [
		{ command: 'start', handler: startHandler, description: 'Запустить бота' },
		{ command: 'schedule', handler: getWeekScheduleHandler, description: 'Посмотреть расписание' },
		{ command: 'week', handler: getWeekInfoHandler, description: 'Какая сейчас неделя' },
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

import { greetingMessage } from './greetings.js'
import { getMainMenu } from './components/keyboards/keyboards.js'
import { getWeek, isWeekEven } from './components/definitionOfWeek.js'
import { contactInfo } from './contactMe.js'
import { handlerReplyBtn } from './components/handlers/buttonHandler.js'

export const commandHandler = {
	start: ctx => {
		const user = ctx.from
		const userName = user.first_name
		const pseudonym = user.username
		const greetingName = userName || pseudonym
		ctx.reply(`Привет, ${greetingName}!\n${greetingMessage}`, getMainMenu())
	},
	schedule: handlerReplyBtn.scheduleWeek,
	support: ctx => ctx.reply(contactInfo),
	week: async ctx => {
		const date = new Date()
		const week = isWeekEven(date) ? 'Четная' : 'Нечетная'
		ctx.replyWithHTML(`📆Сейчас <b>${week}</b> неделя\n📆Номер недели: <b>${getWeek(new Date())}</b>`)
	},
}

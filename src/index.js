import { Telegraf } from 'telegraf'
import 'dotenv/config'

import { greetingMessage } from './greetings.js'
import { getMainMenu } from './components/keyboards/keyboards.js'
import { contactInfo } from './contactMe.js'
import { handlerReplyBtn, addButtonAction } from './components/handlers/buttonHandler.js'
import { isWeekEven, getWeek } from './components/definitionOfWeek.js'
import { getLessonsInfo } from './components/handlers/scheduleHandler.js'

const bot = new Telegraf(process.env.TELEGRAM_TOKEN, { polling: true })

bot.command('start', ctx => {
	const user = ctx.from
	const userName = user.first_name
	const pseudonym = user.username
	const greetingName = userName || pseudonym
	ctx.reply(`Привет, ${greetingName}!\n${greetingMessage}`, getMainMenu())
})

bot.command('schedule', handlerReplyBtn.scheduleWeek)

bot.command('support', ctx => ctx.reply(contactInfo))

bot.command('week', async ctx => {
	const date = new Date()
	const week = isWeekEven(date) ? 'Четная' : 'Нечетная'
	ctx.replyWithHTML(`📆Сейчас <b>${week}</b> неделя\n📆Номер недели: <b>${getWeek(new Date())}</b>`)
})

bot.command('hide', ctx => {
	ctx.reply('Клавиатура скрыта. Чтобы вернуть ее, используй /show.', {
		reply_markup: {
			remove_keyboard: true,
		},
	})
})

bot.command('show', ctx => {
	ctx.reply('Клавиатура на месте.Чтобы скрыть ее, используй /hide', {
		reply_markup: getMainMenu().reply_markup,
	})
})

bot.hears('Сегодня', handlerReplyBtn.scheduleToday)

bot.hears('Завтра', handlerReplyBtn.scheduleForTomorrow)

bot.hears('Текущая неделя', handlerReplyBtn.scheduleWeek)

bot.hears('Следующая неделя', handlerReplyBtn.scheduleNextWeek)

addButtonAction(bot, 'btnMon', getLessonsInfo('Monday'))
addButtonAction(bot, 'btnTue', getLessonsInfo('Tuesday'))
addButtonAction(bot, 'btnWed', getLessonsInfo('Wednesday'))
addButtonAction(bot, 'btnThu', getLessonsInfo('Thursday'))
addButtonAction(bot, 'btnFri', getLessonsInfo('Friday'))

addButtonAction(bot, 'btnMonNextWeek', getLessonsInfo('Monday', true))
addButtonAction(bot, 'btnTueNextWeek', getLessonsInfo('Tuesday', true))
addButtonAction(bot, 'btnWedNextWeek', getLessonsInfo('Wednesday', true))
addButtonAction(bot, 'btnThuNextWeek', getLessonsInfo('Thursday', true))
addButtonAction(bot, 'btnFriNextWeek', getLessonsInfo('Friday', true))

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

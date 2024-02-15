import { Telegraf } from 'telegraf'
import 'dotenv/config'

import { handlerReplyBtn, addButtonAction } from './components/handlers/buttonHandler.js'
import { getLessonsInfo } from './components/handlers/scheduleHandler.js'
import { commands } from './commandsList.js'
import { commandHandler } from './commandHandler.js'

const bot = new Telegraf(process.env.TELEGRAM_TOKEN, { polling: true })

//Command processing
Object.keys(commandHandler).forEach(command => {
	bot.command(command, commandHandler[command])
})

//Commands list
bot.telegram.setMyCommands(commands)

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

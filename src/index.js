import { Telegraf } from 'telegraf'
import 'dotenv/config'

import { handlerReplyBtn, addButtonAction } from './components/handlers/buttonHandler.js'
import { getLessonsInfo } from './components/handlers/scheduleHandler.js'
import registerBotCommands from './commands/registerBotCommands.js'

const bot = new Telegraf(process.env.TELEGRAM_TOKEN, { polling: true })

registerBotCommands(bot)

bot.hears('Сегодня', handlerReplyBtn.getScheduleToday)

bot.hears('Завтра', handlerReplyBtn.getScheduleForTomorrow)

bot.hears('Текущая неделя', handlerReplyBtn.getScheduleWeek)

bot.hears('Следующая неделя', handlerReplyBtn.getScheduleNextWeek)

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

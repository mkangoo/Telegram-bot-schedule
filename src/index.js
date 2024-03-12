import 'dotenv/config'
import { Telegraf } from 'telegraf'

import buttonHandler from './buttons/buttonsHandler.js'
import registerBotCommands from './commands/registerBotCommands.js'
import { descriptionMessage } from './commands/replyTemplates.js'
import inlineKeyboardHandler from './inlineKeyboard/inlineKeyboardHandler.js'

const bot = new Telegraf(process.env.TELEGRAM_TOKEN, { polling: true })

bot.telegram.setMyDescription(descriptionMessage)

registerBotCommands(bot)

buttonHandler(bot)

inlineKeyboardHandler(bot)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

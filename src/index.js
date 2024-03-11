import { Telegraf } from 'telegraf'
import 'dotenv/config'

import inlineKeyboardHandler from './inlineKeyboard/inlineKeyboardHandler.js'
import registerBotCommands from './commands/registerBotCommands.js'
import buttonHandler from './buttons/buttonsHandler.js'
import { descriptionMessage } from './commands/replyTemplates.js'

const bot = new Telegraf(process.env.TELEGRAM_TOKEN, { polling: true })

bot.telegram.setMyDescription(descriptionMessage)

registerBotCommands(bot)

buttonHandler(bot)

inlineKeyboardHandler(bot)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

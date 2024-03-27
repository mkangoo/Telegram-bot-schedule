import { Telegraf } from 'telegraf'
import 'dotenv/config'

import inlineKeyboardHandler from './inlineKeyboard/inlineKeyboardHandler.js'
import registerBotCommands from './commands/registerBotCommands.js'
import buttonHandler from './buttons/buttonsHandler.js'
import registerBotSettings from './settings/settingsBot.js'

const bot = new Telegraf(process.env.TELEGRAM_TOKEN, { polling: true })

registerBotSettings(bot)

registerBotCommands(bot)

buttonHandler(bot)

inlineKeyboardHandler(bot)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

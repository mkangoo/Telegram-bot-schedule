import { descriptionMessage, descriptionOfTheHeader } from '../commands/replyTemplates.js'

/** @param {import('telegraf').Telegraf} bot*/

export default async bot => {
	bot.telegram.setMyDescription(descriptionMessage)

	bot.telegram.setMyShortDescription(descriptionOfTheHeader)
}

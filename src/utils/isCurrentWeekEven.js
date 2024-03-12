import { getWeekNumber } from './weekNumber.js'

export const isCurrentWeekEven = date => getWeekNumber(date) % 2 === 0

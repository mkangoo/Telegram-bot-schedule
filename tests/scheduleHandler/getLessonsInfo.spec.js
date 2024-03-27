import { dataBase } from '../../data/schedule.js'
import { getLessonsForDay } from '../../src/core/schedule.js'

describe('Works when today is weekend day', () => {
	it('Returns no lessons message for Sunday', () => {
		expect(getLessonsForDay('Sunday', dataBase, { weekOffset: false })).toEqual('<b>🎉 Занятий нет, можно отдыхать.</b>')
	})
	it('Returns no lessons for Saturday', () => {
		expect(getLessonsForDay('Saturday', dataBase, { weekOffset: false })).toEqual('<b>🎉 Занятий нет, можно отдыхать.</b>')
	})
})
describe('Works when today is weekday', () => {
	const WEEK_DAY = 'Wednesday'
	const MOCK_SCHEDULE_DATA = [
		{
			day: 'Wednesday',
			events: [
				{
					start: '2024-01-22T09:55:00',
					end: '2024-01-22T11:25:00',
					title: 'Управление развитием инновационного продукта',
					lection: [2, 3, 4, 5, 6, 7],
					practical: [8, 9],
					description: 'Дегтярёва В.В.',
					audience: 'ЛК - 402',
				},
				{
					start: '2024-01-22T11:35:00',
					end: '2024-01-22T13:05:00',
					title: 'Управление развитием инновационного продукта',
					lection: [],
					practical: [2, 3, 4, 5, 6, 7, 8, 9],
					description: 'Дегтярёва В.В.',
					audience: 'ЛК - 402',
				},
				{
					start: '2024-01-22T13:45:00',
					end: '2024-01-22T15:15:00',
					title: 'Управление развитием инновационного продукта',
					lection: [],
					practical: [3, 5, 7],
					description: 'Дегтярёва В.В.',
					audience: 'ЛК - 402',
				},
			],
		},
	]
	it('Works for weekday', () => {
		expect(getLessonsForDay(WEEK_DAY, MOCK_SCHEDULE_DATA, { weekOffset: false }, 4)).toMatchSnapshot()
	})
})

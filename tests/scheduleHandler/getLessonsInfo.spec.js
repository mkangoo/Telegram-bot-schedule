import { getLessonsInfo } from '../../src/components/handlers/scheduleHandler'

describe('getLessonsInfo function', () => {
	it('Weekend testing', () => {
		expect(getLessonsInfo('Sunday', 0)).toEqual('<b>🎉 Занятий нет, можно отдыхать.</b>')
	})
})

it('Weekend testing', () => {
	expect(getLessonsInfo('Saturday', 0)).toEqual('<b>🎉 Занятий нет, можно отдыхать.</b>')
})

it('Weekend testing', () => {
	expect(getLessonsInfo('Saturday', 1)).toEqual('<b>🎉 Занятий нет, можно отдыхать.</b>')
})

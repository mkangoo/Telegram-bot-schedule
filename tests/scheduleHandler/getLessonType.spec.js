import { getLessonType } from '../../src/utils/scheduleHandler'

describe('getLessonType function', () => {
	it('should return "Лекция" if the current week is in the lection array', () => {
		const event = {
			lection: [1, 2, 3], // Assuming currentWeek is 2
			practical: [4, 5, 6],
		}
		const currentWeek = 2
		expect(getLessonType(event, currentWeek)).toEqual('Лекция')
	})

	it('should return "Практика" if the current week is in the practical array', () => {
		const event = {
			lection: [1, 2, 3],
			practical: [4, 5, 6], // Assuming currentWeek is 6
		}
		const currentWeek = 6
		expect(getLessonType(event, currentWeek)).toEqual('Практика')
	})

	it('should return null if neither lection nor practical includes the current week', () => {
		const event = {
			lection: [1, 2, 3],
			practical: [4, 5, 6],
		}
		const currentWeek = 10 // Assuming currentWeek is not in lection or practical arrays
		expect(getLessonType(event, currentWeek)).toBeNull()
	})
})

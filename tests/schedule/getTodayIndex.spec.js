import { getTodayIndex } from '../../src/core/schedule'

describe('Works to determine the index of the day of the week', () => {
	it('Should return Sunday number(0)', () => {
		const data = new Date('2024-03-31T17:36:47.290Z')
		expect(getTodayIndex(data)).toEqual(0)
	})
	it('Should return Monday number(1)', () => {
		const data = new Date('2024-03-25T17:36:47.290Z')
		expect(getTodayIndex(data)).toEqual(1)
	})
	it('Should return Tuesday number(2)', () => {
		const data = new Date('2024-03-26T17:36:47.290Z')
		expect(getTodayIndex(data)).toEqual(2)
	})
	it('Should return Wednesday number(3)', () => {
		const data = new Date('2024-03-27T17:36:47.290Z')
		expect(getTodayIndex(data)).toEqual(3)
	})
	it('Should return Thursday`s number(4)', () => {
		const data = new Date('2024-03-28T17:36:47.290Z')
		expect(getTodayIndex(data)).toEqual(4)
	})
	it('Should return Friday number(5)', () => {
		const data = new Date('2024-03-29T17:36:47.290Z')
		expect(getTodayIndex(data)).toEqual(5)
	})
	it('Should return Saturday number(6)', () => {
		const data = new Date('2024-03-30T17:36:47.290Z')
		expect(getTodayIndex(data)).toEqual(6)
	})
})

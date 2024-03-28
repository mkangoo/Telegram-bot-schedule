import { getFullSchedule } from '../../src/core/schedule'

describe('Full schedule', () => {
	it('The function should return the complete schedule for the week', () => {
		expect(getFullSchedule(2)).toMatchSnapshot()
	}),
		it('The function should return the complete schedule for the week', () => {
			expect(getFullSchedule(3)).toMatchSnapshot()
		}),
		it('The function should return the complete schedule for the week', () => {
			expect(getFullSchedule(4)).toMatchSnapshot()
		}),
		it('The function should return the complete schedule for the week', () => {
			expect(getFullSchedule(5)).toMatchSnapshot()
		}),
		it('The function should return the complete schedule for the week', () => {
			expect(getFullSchedule(6)).toMatchSnapshot()
		}),
		it('The function should return the complete schedule for the week', () => {
			expect(getFullSchedule(7)).toMatchSnapshot()
		}),
		it('The function should return the complete schedule for the week', () => {
			expect(getFullSchedule(8)).toMatchSnapshot()
		}),
		it('The function should return the complete schedule for the week', () => {
			expect(getFullSchedule(9)).toMatchSnapshot()
		}),
		it('The function should return the complete schedule for the week', () => {
			expect(getFullSchedule(10)).toMatchSnapshot()
		}),
		it('Should return NO_LESSON_MESSAGE for each day', () => {
			expect(getFullSchedule(11)).toMatchSnapshot()
		})
})

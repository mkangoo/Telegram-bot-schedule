import { checkIsSunday } from '../../src/core/schedule'
describe('Works when today is Sunday', () => {
	it('Should return true', () => {
		expect(checkIsSunday(0)).toEqual(true)
	}),
		it('Should return false', () => {
			expect(checkIsSunday(1)).toEqual(false)
		}),
		it('Should return false', () => {
			expect(checkIsSunday(2)).toEqual(false)
		}),
		it('Should return false', () => {
			expect(checkIsSunday(3)).toEqual(false)
		}),
		it('Should return false', () => {
			expect(checkIsSunday(4)).toEqual(false)
		}),
		it('Should return false', () => {
			expect(checkIsSunday(5)).toEqual(false)
		}),
		it('Should return false', () => {
			expect(checkIsSunday(6)).toEqual(false)
		})
})

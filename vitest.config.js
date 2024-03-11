/* eslint-disable import/no-unresolved */
import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		coverage: {
			provider: 'istanbul',
		},
		globals: {
			describe: 'describe',
			it: 'it',
			expect: 'expect',
		},
	},
})

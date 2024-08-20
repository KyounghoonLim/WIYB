import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const modules = require('./src/styles/lib/tailwind/module')
const utilities = require('./src/styles/lib/tailwind/plugin/utilities')
const components = require('./src/styles/lib/tailwind/plugin/components')
const functions = require('./src/styles/lib/tailwind/plugin/functions')

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      ...modules,
    },
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents, matchUtilities, theme }) {
      addUtilities(utilities)
      addComponents({ ...components })
      matchUtilities(functions, { values: theme('color') })
    }),
  ],
}
export default config

import { type Config } from 'prettier'

const config: Config = {
  plugins: ['prettier-plugin-tailwindcss'],
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
}

export default config

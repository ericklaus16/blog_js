import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        'green-blog': '#6EEB83',
        'background': "#272727",
        'subtitle-gray': "#a5a5a5",
      },
      spacing:{
        'fullFlex': '102.5rem',
        '200': '48rem',
        '73pc': '73%',
      },
      fontSize:{
        '3.5xl': '1.8rem'
      }
    },
  },
  plugins: [],
}
export default config

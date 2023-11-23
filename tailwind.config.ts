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
        'postsHeightMobileSmall': '40rem',
        'postsHeightMobileMed': '48rem',
        '76pc': '76%',
      },
      fontSize:{
        '3.5xl': '1.8rem'
      },
      screens:{
        'buttons': '410px',
        'sm': '415px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      }
    },
  },
  plugins: [],
}
export default config

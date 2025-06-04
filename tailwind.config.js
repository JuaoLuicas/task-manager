/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshiLight: ['Satoshi-Light'],
        satoshiRegular: ['Satoshi-Regular'],
        satoshiBold: ['Satoshi-Bold'],
        satoshiBlack: ['Satoshi-Black']
      },
      colors: {
        'primary-color': 'var(--primary-color)',
        'secondary-color': 'var(--secondary-color)',
        
        'extra-color': 'var(--extra-color)',
        'extra-color-lighter': 'var(--extra-color-lighter)',

        'indigo-dye': 'var(--indigo-dye)',
        'lapis-lazuli': 'var(--lapis-lazuli)',
        'argentinian-blue': 'var(--argentinian-blue)',
        'space-cadet': 'var(--space-cadet)',
        'united-nations-blue': 'var(--united-nations-blue)',
        'white-tone-1': 'var(--white-tone-1)',
        'white-tone-2': 'var(--white-tone-2)'
      }
    },
  },
  plugins: [],
}


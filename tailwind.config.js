/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.gray,
            emerald: colors.emerald,
            indigo: colors.indigo,
            yellow: colors.yellow,
            red: colors.red,
            blue: colors.blue,
            cyan: colors.cyan,
            green: colors.green,
            'custom-bg': {
                500: '#009485',
                600: '#037e71'
            }
        }
    },
    plugins: [
        require('@tailwindcss/forms')
    ]
}


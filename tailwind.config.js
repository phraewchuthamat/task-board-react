/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                theme: {
                    dark: {
                        bg: '#27374D',
                        surface: '#526D82',
                        card: '#9DB2BF',
                        text: '#DDE6ED',
                    },
                    // Light Mode Palette
                    light: {
                        bg: '#F8F6F4',
                        surface: '#E3F4F4',
                        card: '#D2E9E9',
                        accent: '#C4DFDF',
                        text: '#27374D',
                    },
                },
            },
        },
    },
    plugins: [],
}

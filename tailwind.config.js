/** @type {import("tailwindcss").Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['ui-sans-serif', 'system-ui'],
            },
            colors: {
                theme: {
                    dark: {
                        bg: '#222831',
                        surface: '#393E46',
                        card: '#EEEEEE',
                        text: '#00ADB5',
                    },
                    light: {
                        bg: '#F8F6F4',
                        surface: '#FCF8F8',
                        card: '#FBEFEF',
                        accent: '#F9DFDF',
                        text: '#F5AFAF',
                    },
                },
            },
        },
    },
    plugins: [],
}

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
                brand: {
                    bg: 'var(--bg-color)',
                    surface: 'var(--surface-color)',
                },
                app: {
                    bg: 'var(--color-bg)',
                    surface: 'var(--color-surface)',
                    card: 'var(--color-card)',
                    text: 'var(--color-text)',
                    accent: 'var(--color-accent)',
                },
            },
        },
    },
    plugins: [],
}

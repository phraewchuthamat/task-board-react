/** @type {import("tailwindcss").Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            colors: {
                app: {
                    bg: 'var(--color-bg)',
                    surface: 'var(--color-surface)',
                    card: 'var(--color-card)',
                    column: 'var(--color-column)',
                    border: 'var(--color-border)',

                    text: 'var(--color-text)',
                    subtle: 'var(--color-subtle-text)',

                    // Button & Actions
                    primary: 'var(--color-accent)',
                    'primary-hover': 'var(--color-accent-hover)',
                    'primary-fg': 'var(--color-accent-text)',

                    danger: 'var(--color-danger)',
                    'danger-hover': 'var(--color-danger-hover)',
                },
            },
        },
    },
    plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}

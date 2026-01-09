/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                theme: {
                    dark: {
                        bg: '#27374D', // พื้นหลังหลัก
                        surface: '#526D82', // พื้นหลังคอลัมน์
                        card: '#9DB2BF', // พื้นหลังการ์ด
                        text: '#DDE6ED', // สีตัวอักษร
                    },
                    // Light Mode Palette
                    light: {
                        bg: '#F8F6F4', // พื้นหลังหลัก
                        surface: '#E3F4F4', // พื้นหลังคอลัมน์
                        card: '#D2E9E9', // พื้นหลังการ์ด (หรือใช้ accent)
                        accent: '#C4DFDF', // สีตกแต่ง/ปุ่ม
                        text: '#27374D', // สีตัวอักษร (ยืมสีเข้มสุดของ Dark มาใช้ให้อ่านง่าย)
                    },
                },
            },
        },
    },
    plugins: [],
}

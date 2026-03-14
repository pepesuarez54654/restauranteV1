/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1B6B3A',
                action: '#E07B1A',
                'bg-light': '#F4F4F4',
            },
            fontFamily: {
                display: ['"Playfair Display"', 'serif'],
                sans: ['"DM Sans"', 'sans-serif'],
            }
        },
    },
    plugins: [],
}

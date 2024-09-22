/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                black: {
                    100: '#333333'
                },
                gray: {
                    100: '#A6A6A6',
                    200: '#EAEAEA',
                    300: '#F7F7F7',
                    400: '#B3B3B3',
                    500: '#D6D6D6'
                },
                beige: {
                    40: '#F3DFD4',
                    70: '#EAC7B4',
                    100: '#E1AF93',
                    120: '#B48C76'
                }
            },
            height: {
                '25': '100px',
                '12.5': '50px'
            },
            size: {
                '12.5': '50px'
            },
            gap: {
                '12.5': '50px'
            },
            padding: {
                '18.5': '70px'
            },
            fontSize: {
                '80': '80px'
            },
            lineHeight: {
                '70': '70px'
            },
            fontFamily: {
                belleza: ['Belleza', "Belleza"],
                bellefair: ['Bellefair', "Bellefair"],
                jost: ['Jost', "Jost"],
            }
        },
    },
}


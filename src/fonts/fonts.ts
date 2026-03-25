import { Inter } from 'next/font/google';

export const appFont = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--app-font',
    fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif']
});

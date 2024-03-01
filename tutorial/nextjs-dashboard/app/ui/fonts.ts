import { Inter, Roboto } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const roboto = Roboto({
  weight: '300',
  variable: '--roboto-font',
  subsets: ['latin'],
});

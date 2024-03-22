import '@/app/ui/global.css';
import { inter, roboto } from './ui/fonts';
import style from './ui/font.module.css';
import { Metadata } from 'next';

export const metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Course Dashboard, built with App Router.',
} satisfies Metadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      {/* <body className={inter.className}>{children}</body> */}
      <body className={style.font}>{children}</body>
    </html>
  );
}

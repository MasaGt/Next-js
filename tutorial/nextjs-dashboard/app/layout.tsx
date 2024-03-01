import '@/app/ui/global.css';
import { inter, roboto } from './ui/fonts';
import style from './ui/font.module.css';

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

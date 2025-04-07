import type { Metadata } from "next";
import { Montserrat} from "next/font/google";
import "./globals.css";
import Script from "next/script"


const montSains = Montserrat({
  variable: "--font-mont-sains",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Eden Garden",
  description: "Eden Garden es una tienda de jardinería que ofrece una amplia variedad de plantas, macetas y accesorios para el cuidado de tus espacios verdes.",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="light">
      <head>
        <link rel="icon" href="/Logo_Eden_Icon.png" />
        <meta name="color-scheme" content="light dark" />
        {/* Script para aplicar el tema según el sistema */}
        <Script id="theme-detect" strategy="beforeInteractive">
          {`
            const systemPrefer = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', systemPrefer);
            document.querySelector('meta[name="color-scheme"]').setAttribute('content', systemPrefer);
          `}
        </Script>
      </head>
      <body className={montSains.className}>
        {children}
      </body>
    </html>
  );
}

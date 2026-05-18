import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import { QueryProvider } from "@/components/QueryProvider/QueryProvider";
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WellCard",
  description: "Crie e gerencie convites digitais",
};

const themeScript = `
  (function () {
    var stored = localStorage.getItem('theme');
    var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', stored || preferred);
  })();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${jakarta.variable} ${lora.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <QueryProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { QueryProvider } from "@/components/QueryProvider/QueryProvider";
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Invitation App",
  description: "Create and manage digital invitations",
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
    <html lang="en" suppressHydrationWarning>
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

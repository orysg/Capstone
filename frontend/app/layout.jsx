"use client";
import "./globals.css";
import { ThemeProvider } from "@material-tailwind/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico"/>
      </head>
      <body className="min-h-screen flex bg-gray-100">
        <main className="flex-1 justify-center items-center">
          <ThemeProvider>{children}</ThemeProvider>
        </main>
      </body>
    </html>
  );
}
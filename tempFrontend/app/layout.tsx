"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import DefaultSidebar from "./components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
;



  return (
    <html lang="en">
      <body className="min-h-screen flex bg-gray-100">
      {!(pathname.startsWith("/signin") || pathname.startsWith("/signup") || pathname === "/") &&( // Adjust this line for any specific pages you want to exclude
          <DefaultSidebar />
        )}
        <main className="flex-1 justify-center items-center">
          <ThemeProvider>{children}</ThemeProvider>
        </main>
      </body>
    </html>
  );
}

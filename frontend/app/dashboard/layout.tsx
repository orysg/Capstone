"use client";
import { ThemeProvider } from "@material-tailwind/react";
import DefaultSidebar from "../components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="relative h-screen bg-gray-100">
        <DefaultSidebar />
        <main className="p-4">{children}</main>
      </div>
    </ThemeProvider>
  );
}

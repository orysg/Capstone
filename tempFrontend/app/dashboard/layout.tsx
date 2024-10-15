"use client";
import { ThemeProvider, Typography } from "@material-tailwind/react";
import DefaultSidebar from "../components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center p-4 bg-white shadow">
        <DefaultSidebar />
        <Typography variant="h5" className="font-bold">
          Dashboard
        </Typography>
      </header>
      <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">
        <ThemeProvider>{children}</ThemeProvider>
      </main>
    </div>
  );
}

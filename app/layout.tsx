import type { Metadata } from "next";
import "./globals.css";
import ResponsiveNav from "../components/ResponsiveNav";
export const metadata: Metadata = {
  title: "DeenEvents Kerala",
  description: "Platform for discovering Islamic Events around Kerala",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="system">
      {/* Added dark mode base classes: dark:bg-gray-950 */}
      <body className="antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <ResponsiveNav />
        {/* max-w-7xl makes it wide on PC, px-4 keeps it safe on mobile */}
        <div className="max-w-7xl mx-auto min-h-screen pb-24 md:pb-8 md:pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
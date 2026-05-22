import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

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
    <html lang="en">
      <body className="antialiased bg-gray-50 selection:bg-emerald-200">
        {/* Main page content rendering wrapper */}
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-md relative">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Ensure your global styles match your file system structure

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "DeenEvents Kerala",
  description: "Discover Islamic lectures, dars, khutbahs and Muslim events across Kerala.",
  keywords: [
    "Kerala Islamic events",
    "Islamic programmes Kerala",
    "Muslim events Kerala",
    "Islamic lectures Kerala",
    "DeenEvents Kerala",
  ],
  openGraph: {
    title: "DeenEvents Kerala",
    description: "Discover Islamic lectures and programmes happening across Kerala.",
    url: "https://deenevents.vercel.app", // Consider updating this to your Cloudflare domain later!
    siteName: "DeenEvents Kerala",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DeenEvents Kerala",
    description: "Find Islamic events happening across Kerala.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased bg-[#030509]">
        {children}
      </body>
    </html>
  );
}
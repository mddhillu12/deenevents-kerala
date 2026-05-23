// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import ResponsiveNav from "@/components/ResponsiveNav";
import Footer from "@/components/Footer"; // We'll create this soon

export const metadata: Metadata = {
  title: {
    default: "DeenEvents Kerala",
    template: "%s | DeenEvents Kerala",
  },
  description: "Discover authentic Islamic events, lectures, dars, khutbahs, and community programs across Kerala. Find events in Malappuram, Kozhikode, Kochi and more.",
  keywords: ["Islamic events Kerala", "Dars Kerala", "Islamic lectures Malappuram", "Muslim events Kozhikode", "Khutbah", "Sisters program Kerala"],
  authors: [{ name: "DeenEvents Kerala" }],
  openGraph: {
    title: "DeenEvents Kerala - Discover Islamic Events",
    description: "The best platform to find authentic Islamic events happening across Kerala.",
    images: [
      {
        url: "https://deenevents-kerala.mddhillu12.workers.dev/og-image.jpg", // We'll create this later
        width: 1200,
        height: 630,
        alt: "DeenEvents Kerala",
      },
    ],
    locale: "en_IN",
    siteName: "DeenEvents Kerala",
  },
  twitter: {
    card: "summary_large_image",
    title: "DeenEvents Kerala",
    description: "Islamic Events in Kerala",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col transition-colors duration-300">
        <ResponsiveNav />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 pt-20 md:pt-24 pb-12">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DevOps Portfolio",
  description: "Blogs + Projects + Résumé",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-800">
        <nav className="bg-white shadow p-4 flex gap-6 justify-center font-medium text-blue-600">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/resume">Résumé</Link>
          <Link href="/projects">Projects</Link>
        </nav>
        <div className="max-w-3xl mx-auto">{children}</div>
      </body>
    </html>
  );
}

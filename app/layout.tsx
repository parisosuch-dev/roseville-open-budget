import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <div className="flex flex-1 h-full">{children}</div>
        <div className="w-full flex justify-center items-center">
          <p>
            made with ❤️ by{" "}
            <a
              href="https://www.parisosuch.com"
              target="_blank"
              className="underline"
            >
              parisosuch.com
            </a>
          </p>
        </div>
      </body>
    </html>
  );
}

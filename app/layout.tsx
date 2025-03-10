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
  title: "Roseville Open Budget",
  description: "Accessible budget data from Roseville, CA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add your emoji favicon here */}
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><text x='0' y='25' font-size='24'>🌹</text></svg>"
          type="image/svg+xml"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col py-8 sm:py-4`}
      >
        <div className="flex flex-1 h-full">{children}</div>
        <div className="w-full flex justify-center items-center mt-8 space-x-4 sm:space-x-8">
          <p>
            Made with ❤️ by{" "}
            <a
              href="https://www.parisosuch.com"
              target="_blank"
              className="underline"
            >
              parisosuch.com
            </a>
          </p>
          <p>
            I am{" "}
            <a
              href="https://www.github.com/parisosuch-dev/roseville-open-budget"
              target="_blank"
              className="underline"
            >
              open source!
            </a>
          </p>
        </div>
      </body>
    </html>
  );
}

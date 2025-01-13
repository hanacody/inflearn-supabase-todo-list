"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryClientProvider from "config/ReactQueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <nav className="flex justify-center gap-4 py-4 border-b">
            <a href="/" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 border-b-2 border-transparent hover:border-gray-300">
              <i className="fas fa-list-ul mr-2"></i>
              TODO
            </a>
            <a href="/dropbox" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 border-b-2 border-transparent hover:border-gray-300">
              <i className="fab fa-dropbox mr-2"></i>
              Dropbox
            </a>
            <a href="/netflix" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 border-b-2 border-transparent hover:border-gray-300">
              <i className="fab fa-netflix mr-2"></i>
              Netflix
            </a>
            <a href="/instagram" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 border-b-2 border-transparent hover:border-gray-300">
              <i className="fab fa-instagram mr-2"></i>
              Instagram
            </a>
          </nav>
          {children}
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}

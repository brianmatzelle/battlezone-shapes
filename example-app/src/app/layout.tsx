"use client";

import "./globals.css";
import { Starfield } from "battlezone-shapes"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Starfield />
        {children}
      </body>
    </html>
  );
}

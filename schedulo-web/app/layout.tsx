'use client';

import { Montserrat, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import useIsBiz from "./hooks/is-biz";
import useColorScheme, { ColorScheme } from "./hooks/color-scheme";

const font = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const monoFont = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const light = "garden";
  const dark = "dracula";
  const lightBiz = "corporate";
  const darkBiz = "business";
  const isBiz = useIsBiz();
  const colorScheme = useColorScheme();
  const theme = isBiz
    ? colorScheme === ColorScheme.Light
      ? lightBiz
      : darkBiz
    : colorScheme === ColorScheme.Light
    ? light
    : dark;
  return (
    <html lang="en" data-theme={theme}>
      <body className={`${font.variable} ${monoFont.variable} font-sans`}>
        <Navbar />
        <div className="p-6 pt-8 lg:pt-36 mx-auto lg:w-1/2">{children}</div>
      </body>
    </html>
  );
}

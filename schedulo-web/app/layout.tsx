import type { Metadata } from "next";
import { Montserrat, Roboto_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Schedulo",
  description: "Schedule your barber appointments and many more!",
};

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
  return (
    <html lang="en">
      <body className={`${font.variable} ${monoFont.variable} font-sans mt-10`}>
        {children}
      </body>
    </html>
  );
}

import { Montserrat, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { Metadata } from "next";

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
      <body className={`${font.variable} ${monoFont.variable} font-sans`}>
        <Navbar />
        <div className="p-6 pt-8 lg:pt-36 mx-auto lg:w-1/2">{children}</div>
      </body>
    </html>
  );
}

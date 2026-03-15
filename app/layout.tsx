import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import ReactQueryProvider from "@/components/ReactQueryProvider/ReactQueryProvider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"]
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  title: "RentalCar App",
  description: "RentalCar app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${inter.variable}`}>
        <ReactQueryProvider>
        <Header/>
        <main>
        {children}
        </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

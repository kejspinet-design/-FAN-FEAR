import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/common/Preloader";
import AnimatedBackground from "@/components/common/AnimatedBackground";
import ParticlesBackground from "@/components/common/ParticlesBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fan-Fear Dashboard",
  description: "Fan-сообщество Fear - проект по серверу cs2 Fear",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased smooth-scroll`}
    >
      <body className="min-h-full relative">
        <Preloader />
        <AnimatedBackground />
        <ParticlesBackground />
        {children}
      </body>
    </html>
  );
}

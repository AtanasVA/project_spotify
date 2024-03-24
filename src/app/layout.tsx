"use client";
import "~/styles/globals.css";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { NextUIProvider } from "@nextui-org/react";
import Header from "./_components/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} min-h-screen bg-background text-foreground dark`}
      >
        <TRPCReactProvider>
          <Header />
          <NextUIProvider>{children}</NextUIProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

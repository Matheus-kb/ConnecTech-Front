import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { UserProvider } from "./_context/userContext"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ConnecTech",
  description: "Plataforma de eventos Tecnologicos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
        {children}
        </UserProvider>
        </body>
    </html>
  );
}

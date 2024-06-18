import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import NavigationBar from "./components/NavigationBar";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FizFreight Dashboard",
  description: "Manage your shipping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={inter.className}>
            <NavigationBar />
            {children}
            <Toaster />
        </body>
        
    </html>
  );
}

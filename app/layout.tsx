import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster, toast } from 'sonner'
import Navbar from "@/components/navbar";
import RecoilContextProvider, { ReactQuearyProvider } from "@/lib/recoilContextProvider";
import { ThemeProvider } from '@/components/theme-provider';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "V-choose",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} >
          <SessionProvider>
          <Toaster richColors />
          <RecoilContextProvider>
          <SessionProvider> 
            <ReactQuearyProvider>
              <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <Navbar></Navbar>
            <div className="flex flex-col  min-h-screen pt-20  bg-white dark:bg-zinc-800 ">
        {children}
        </div>
        </ThemeProvider>
        <ReactQueryDevtools />
        </ReactQuearyProvider>
        </SessionProvider>
        </RecoilContextProvider>
        </SessionProvider>
        
        </body>
    </html>
  );
}

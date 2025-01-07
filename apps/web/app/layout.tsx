import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@repo/ui/globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "@repo/ui/components/toaster";
import { TRPCReactProvider } from "@/trpc/client";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Monorepo",
  description: "Monorepo starter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <TRPCReactProvider>
          <Navbar />
          <main className="dark:grainy-dark flex light:grainy-light flex-col min-h-screen pt-20">
            {children}
            <Toaster />
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

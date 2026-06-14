import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { GlobalStructuredData } from "@/components/seo/StructuredData";
import { ROOT_METADATA } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = ROOT_METADATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className="h-full antialiased">
      <head>
        <meta name="apple-mobile-web-app-title" content="HyperNest" />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <GlobalStructuredData />
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

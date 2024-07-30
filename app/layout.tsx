import Footer from "@/src/components/footer/Footer";
import Nav from "@/src/components/nav/Nav";
import { THEME } from "@/src/constants/theme.constant";
import type { Metadata, Viewport } from "next";
import Head from "next/head";
import "s/styles/global.css";
import ThemeProvider from "./(providers)/ThemeProvider";

export const metadata: Metadata = {
  title: "WIYB",
  description: "What's In Your Golf Bag?",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: THEME.DEFAULT,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className="CONTAINER bg-@-bg-light">
          <Nav />
          {children}
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}

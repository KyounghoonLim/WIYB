import Footer from "@/src/components/footer/Footer";
import Nav from "@/src/components/nav/Nav";
import { THEME } from "@/src/constants/theme.constant";
import type { Metadata, Viewport } from "next";
import "s/styles/global.css";
import ThemeProvider from "../src/providers/ThemeProvider";
import RecoilContainer from "@/src/components/containers/RecoilContainer";
import RequestTimeProvider from "@/src/providers/RequestKeyProvider";

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
      <RequestTimeProvider>
        <ThemeProvider>
          <body className="CONTAINER bg-@-bg-light">
            <Nav />
            <RecoilContainer>{children}</RecoilContainer>
            <Footer />
          </body>
        </ThemeProvider>
      </RequestTimeProvider>
    </html>
  );
}

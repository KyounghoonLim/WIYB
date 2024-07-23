import Nav from "@/src/components/nav/Nav";
import type { Metadata } from "next";
import "s/styles/global.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-@-bg-light">
        <main className="CONTAINER">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}

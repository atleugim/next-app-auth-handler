import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "~/providers/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next App Auth Handler",
  description:
    "Next.js authentication handler example using route-handlers and server-actions with token rotation",
  authors: {
    name: "Miguel Vega",
    url: "https://github.com/atleugim",
  },
};

const fontSans = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

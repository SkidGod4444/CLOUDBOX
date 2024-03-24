import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/global/theme/theme.provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cloudbox - File Storage Service",
  description: "Cloudbox is a file storage service that allows you to store and share files with others.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/cloudboxlogo.png",
        href: "/cloudlogo.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/cloudboxpinklogo.png",
        href: "/cloudboxpinklogo.png",
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}

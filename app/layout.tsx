import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/global/theme/theme.provider";
import { UserProvider } from "@/context/user.context";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { RoutesContext } from "@/context/route.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cloudbox - File Storage Service",
  description:
    "Cloudbox is a free & unlimited file storage service that allows you to store and share files with others. Built on the top of telegram. Made with love by Saidev Dhal",
  keywords: [
    "file storage",
    "cloud storage",
    "file sharing",
    "free unlimited storage",
    "unlimited storage",
    "free",
    "unlimited",
    "storage",
    "saidev dhal",
    "saidev dhal projects",
  ],
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/cloudboxlogo.png",
        href: "/cloudboxlogo.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/cloudboxpinklogo.png",
        href: "/cloudboxpinklogo.png",
      },
    ],
  },
  openGraph: {
    title: "Cloudbox - File Storage Service",
    description:
      "Cloudbox is a free & unlimited file storage service that allows you to store and share files with others. Built on the top of telegram. Made with love by Saidev Dhal",
    url: "https://cloud-box.devwtf.in",
    siteName: "Cloudbox",
    images: [
      {
        url: "https://i.imgur.com/WQhg2nq.png",
        width: 1200,
        height: 630,
        alt: "Cloudbox logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://cloud-box.devwtf.in/",
    creator: "Saidev Dhal",
    title: "Cloudbox - File Storage Service",
    description:
      "Cloudbox is a free & unlimited file storage service that allows you to store and share files with others. Built on the top of telegram. Made with love by Saidev Dhal",
    images: "https://i.imgur.com/WQhg2nq.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const protectedRoutes = ["/chat", "/memories", "/c", "/spaces"];
const publicRoutes = ["/", "/auth"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <UserProvider>
        <RoutesContext
         protectedRoutes={protectedRoutes}
         publicRoutes={publicRoutes}
         >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </RoutesContext>
        </UserProvider>
      </body>
    </html>
  );
}

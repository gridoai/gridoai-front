import { Toaster } from "@/components/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Grido AI",
  description: "Your intelligent knowledge base",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorText: "white",
          colorBackground: "rgba(100,100,100,0.1)",
          colorPrimary: "white",
        },
      }}
    >
      <html lang="en">
        <head>
          <meta name="robots" content="noindex" />
        </head>
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

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
          colorBackground: "#141619",
          colorPrimary: "#7857FF",
        },
        elements: {
          socialButtonsIconButton: {
            borderColor: "#30373d",
            backgroundColor: "#141619",
            borderRadius: "0.5rem",
            color: "white",
          },
          userButtonPopoverCard:
            "backdrop-blur-lg bg-opacity-20 drop-shadow-lg",
          userButtonPopoverActionButtonIcon: "text-neutral-200",
          userButtonPopoverActionButton: "hover:bg-neutral-700 bg-opacity-0",
          card: {
            backgroundColor: "rgba(100,100,100,0.1) !important",
          },
          userButtonPopoverFooter: "hidden",
          modalContent: "backdrop-blur-lg bg-opacity-20 drop-shadow-lg",
          organizationSwitcherPopoverCard:
            "backdrop-blur-lg bg-opacity-20 [&>*]:text-white",
          organizationSwitcherPopoverActionButtonIcon: "text-neutral-200",
          organizationSwitcherPopoverFooter: "hidden",
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
export const runtime = "edge";

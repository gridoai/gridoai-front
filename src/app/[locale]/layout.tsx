import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/toaster";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import RefineProvider from "../refine-provider";
import { ClientProviders } from "../client-providers";
import { ThemeProvider } from "@/providers/theme";
import { ptBR } from "@clerk/localizations";
import SubLayout from "./client/layout";
import { AxiomWebVitals } from "next-axiom";
import { getStaticParams } from "../../locales/server";

// eslint-disable-next-line quotes
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: `Grido AI`,
  description: `Your intelligent knowledge base`,
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <ClerkProvider
      localization={params.locale === `pt` ? ptBR : undefined}
      appearance={{
        variables: {
          colorText: `#fafafa`,
          colorBackground: `#141619`,
          colorPrimary: `#4299e8`,
          colorInputText: `#fafafa`,
        },
        elements: {
          tabButton: `text-foreground`,
          tabPanel: `text-foreground, [& *]:text-foreground`,
          tabListContainer: `text-foreground`,
          tagInputContainer: `[&>input]:text-foreground [&>input]:bg-transparent bg-transparent border-border text-foreground`,
          formFieldInput: `text-foreground bg-transparent border-border`,
          selectButton: `bg-transparent border-border text-foreground`,

          tagPillContainer: `bg-input`,

          socialButtonsIconButton: {
            borderColor: `#30373d`,
            backgroundColor: `#141619`,
            borderRadius: `0.5rem`,
            color: `white`,
          },
          userButtonPopoverCard: `backdrop-blur-lg bg-opacity-20 drop-shadow-lg`,
          userButtonPopoverActionButtonIcon: `text-neutral-200`,
          userButtonPopoverActionButton: `hover:bg-neutral-700 bg-opacity-0`,
          card: {
            backgroundColor: `rgba(100,100,100,0.1) !important`,
          },
          userButtonPopoverFooter: `hidden`,

          modalContent: `backdrop-blur-lg bg-opacity-20 drop-shadow-lg`,
          organizationSwitcherPopoverCard: `backdrop-blur-lg bg-opacity-20 [&>*]:text-foreground z-100`,
          organizationSwitcherPopoverActionButtonIcon: `text-neutral-200`,
          organizationSwitcherPopoverFooter: `hidden`,
          rootBox: `items-center flex`,
        },
      }}
    >
      <html lang="en" className="flex">
        <head />
        <body className={`${inter.className} flex`}>
          <AxiomWebVitals />
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <ClientProviders>
              <SubLayout params={params}>
                <RefineProvider>{children}</RefineProvider>
              </SubLayout>
              <Toaster />
            </ClientProviders>
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}

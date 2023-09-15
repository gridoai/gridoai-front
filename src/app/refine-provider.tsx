"use client";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/app";
import { restDataProvider } from "../services/api";
import { RefineThemes } from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useCurrentLocale } from "../locales/client";
const queryClient = new QueryClient();

const theme = extendTheme({
  config: {
    cssVarPrefix: `ck`,
  },
  colors: {
    ...RefineThemes.Blue.colors,
    transparent: `transparent`,
    black: `#000`,
    white: `#fff`,
    gray: {
      50: `#f7fafc`,
      // ...
      800: `var(--card)`,

      700: `#30373d`,

      900: `#070809`,
    },
    // ...
  },
});

export default function RefineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useCurrentLocale();
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider
        theme={theme}
        colorModeManager={{
          get: () => `dark`,
          set: () => {},
          type: `cookie`,
        }}
      >
        <Refine
          options={{ mutationMode: `optimistic`, disableTelemetry: true }}
          dataProvider={restDataProvider(``)}
          routerProvider={routerProvider}
          resources={[
            {
              name: `documents`,
              list: `${locale}/documents`,
              create: `${locale}/documents/new`,
            },
          ]}
        >
          {children}
        </Refine>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

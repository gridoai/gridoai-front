"use client";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/app";
import { restDataProvider } from "../services/api";
import { RefineThemes } from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    cssVarPrefix: "ck",
  },
  colors: {
    ...RefineThemes.Blue.colors,
    transparent: "transparent",
    black: "#000",
    white: "#fff",
    gray: {
      50: "#f7fafc",
      // ...
      800: "#141619",

      700: "#30373d",

      900: "#070809",
    },
    // ...
  },
});

export default function RefineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChakraProvider
      theme={theme}
      colorModeManager={{
        get: () => "dark",
        set: () => {},
        type: "cookie",
      }}
    >
      <Refine
        options={{ mutationMode: "optimistic" }}
        dataProvider={restDataProvider("")}
        routerProvider={routerProvider}
        resources={[
          {
            name: "documents",
            list: "/documents",
            create: "/documents/new",
          },
        ]}
      >
        {children}
      </Refine>
    </ChakraProvider>
  );
}

"use client";

import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/nextjs-router/app";
import { api } from "../services/api";
import { ThemedLayoutV2, RefineThemes } from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";

export default function RefineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChakraProvider
      theme={RefineThemes.Blue}
      colorModeManager={{
        get: () => "dark",
        set: () => {},
        type: "cookie",
      }}
    >
      <Refine
        dataProvider={dataProvider("", api)}
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

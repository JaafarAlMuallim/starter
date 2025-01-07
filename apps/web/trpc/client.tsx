"use client";

import type { QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact } from "@trpc/react-query";
import {
  httpBatchLink,
  splitLink,
  unstable_httpSubscriptionLink,
} from "@trpc/client";
import superjson from "superjson";

import type { AppRouter } from "@repo/server";

import { createQueryClient } from "./query-client";
import { EventSourcePolyfill } from "event-source-polyfill";

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient();
  } else {
    // Browser: use singleton pattern to keep the same query client
    return (clientQueryClientSingleton ??= createQueryClient());
  }
};

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        splitLink({
          condition: (op) => op.type == "subscription",
          true: unstable_httpSubscriptionLink({
            url: getBaseUrl(),
            transformer: superjson,
            EventSource: EventSourcePolyfill,
            eventSourceOptions: async () => {
              return {
                withCredentials: true,
                headers: {
                  "x-trpc-source": "nextjs-react",
                },
              };
            },
          }),
          false: httpBatchLink({
            url: getBaseUrl(),
            transformer: superjson,
            fetch(url, options) {
              return fetch(url, {
                ...options,
                credentials: "include",
              });
            },
            headers() {
              const headers = new Headers();
              headers.set("x-trpc-source", "nextjs-react");
              return headers;
            },
          }),
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}

const PORT = 8080;
const getBaseUrl = () => {
  return `http://localhost:${PORT}/trpc`;
};

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EventSourcePolyfill } from "event-source-polyfill";
import {
  httpBatchLink,
  splitLink,
  unstable_httpSubscriptionLink,
} from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";

import type { AppRouter } from "@repo/server";
import { authClient } from "./auth-client";
import { getBaseUrl } from "./base-url";
import "@azure/core-asynciterator-polyfill";
import { RNEventSource } from "rn-eventsource-reborn";
import { ReadableStream, TransformStream } from "web-streams-polyfill";

export const api = createTRPCReact<AppRouter>();
export { type RouterInputs, type RouterOutputs } from "@repo/server";

globalThis.ReadableStream = globalThis.ReadableStream || ReadableStream;
globalThis.TransformStream = globalThis.TransformStream || TransformStream;

export function TRPCProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
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
              const headers = new Map<string, string>();
              headers.set("x-trpc-source", "expo-react");
              const cookies = authClient.getCookie();
              if (cookies) {
                headers.set("Cookie", cookies.substring(2));
              }
              return {
                headers: {
                  "x-trpc-source": "expo-react",
                  Cookie: cookies.substring(2),
                },
              };
            },
          }),
          false: httpBatchLink({
            url: getBaseUrl(),
            transformer: superjson,
            headers() {
              const headers = new Map<string, string>();
              headers.set("x-trpc-source", "expo-react");
              const cookies = authClient.getCookie();
              if (cookies) {
                headers.set("Cookie", cookies.substring(2));
              }
              return Object.fromEntries(headers);
            },
          }),
        }),
      ],
    }),
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </api.Provider>
  );
}

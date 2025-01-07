import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server"; // Deno 'npm:@hono/trpc-server'
import { appRouter, createTRPCContext } from "./index";
import { cors } from "hono/cors";
import { auth } from "./lib/auth";

const app = new Hono();

app.on(["POST", "GET"], "/api/auth/**", (c) => {
  return auth.handler(c.req.raw);
});

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:8080",
      "http://localhost:8081",
      "http://localhost:5173",
      "http://localhost:5173",
    ],
    allowMethods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    allowHeaders: ["Content-Type", "Authorization", "Cookie", "x-trpc-source"],
    credentials: true,
  }),
);

//app.use((c, next) => {
//    console.log("MIDDLEWARE")
//  return next();
//});

app.get("/", (c) => {
  return c.json({ status: "ok" });
});

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext: (c) => createTRPCContext({ headers: c.req.headers }),
  }),
);

export default {
  port: 8080,
  fetch: app.fetch,
};

//import { appRouter, createTRPCContext } from "@repo/server";
//import { auth } from "@repo/server/auth";
//import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
//
//import { NextRequest } from "next/server";
//import { z } from "zod";
//
//export const runtime = "nodejs";
//export const runtime = "edge";
//
//const SessionSchema = z.object({
//  session: z.object({
//    id: z.string(),
//    createdAt: z.preprocess(
//      (arg) => (typeof arg == "string" ? new Date(arg) : undefined),
//      z.date(),
//    ),
//    updatedAt: z.preprocess(
//      (arg) => (typeof arg == "string" ? new Date(arg) : undefined),
//      z.date(),
//    ),
//    userId: z.string(),
//    expiresAt: z.preprocess(
//      (arg) => (typeof arg == "string" ? new Date(arg) : undefined),
//      z.date(),
//    ),
//    token: z.string(),
//    ipAddress: z.string().nullable(),
//    userAgent: z.string().nullable(),
//  }),
//  user: z.object({
//    id: z.string(),
//    name: z.string(),
//    email: z.string(),
//    emailVerified: z.boolean(),
//    image: z.string().nullable(),
//    isSubscribed: z.boolean(),
//    createdAt: z.preprocess(
//      (arg) => (typeof arg == "string" ? new Date(arg) : undefined),
//      z.date(),
//    ),
//    updatedAt: z.preprocess(
//      (arg) => (typeof arg == "string" ? new Date(arg) : undefined),
//      z.date(),
//    ),
//  }),
//});
//
///**
// * Configure basic CORS headers
// * You should extend this to match your needs
// */
//const setCorsHeaders = (res: Response) => {
//  res.headers.set("Access-Control-Allow-Origin", "*");
//  res.headers.set("Access-Control-Request-Method", "*");
//  res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
//  res.headers.set("Access-Control-Allow-Headers", "*");
//};
//
//export const OPTIONS = () => {
//  const response = new Response(null, {
//    status: 204,
//  });
//  setCorsHeaders(response);
//  return response;
//};
//
//// Env Var
//const SERVER_PORT = 8080;
//
//const handler = async (req: NextRequest) => {
//  const session = await auth.api.getSession({
//    headers: req.headers,
//  });
//
//  const parsedSession = SessionSchema.parse(session);
//
//  const response = await fetchRequestHandler({
//    endpoint: "api/trpc/",
//    router: appRouter,
//    req,
//    createContext: () =>
//      createTRPCContext({
//        session: parsedSession,
//        headers: req.headers,
//      }),
//    onError({ error, path }) {
//      console.error(`>>> tRPC Error on '${path}'`, error);
//    },
//  });
//
//  setCorsHeaders(response);
//  return response;
//};
//
//export { handler as GET, handler as POST };

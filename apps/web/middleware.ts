import { Session } from "@repo/db/schema";
import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import { authMiddleware } from "./lib/auth-client";

//export default async function authMiddleware(request: NextRequest) {
//  const { data: session } = await betterFetch<Session>(
//    "/api/auth/get-session",
//    {
//      baseURL: request.nextUrl.origin,
//      headers: {
//        cookie: request.headers.get("cookie") || "",
//      },
//    },
//  );
//  if (!session) {
//    return NextResponse.redirect(new URL("/sign-in", request.url));
//  }
//  return NextResponse.next();
//}

export default authMiddleware;

export const config = {
  matcher: ["/", "/dashboard"],
};

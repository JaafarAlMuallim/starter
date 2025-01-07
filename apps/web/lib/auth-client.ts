import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { adminClient } from "better-auth/client/plugins";
import { NextRequest, NextResponse } from "next/server";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL!,
  plugins: [adminClient()],
});

export async function authMiddleware(req: NextRequest) {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: {
        cookie: req.headers.get("cookie") || "",
      },
    },
  });
  if (!session) {
    return NextResponse.redirect("/sign-in");
  }
  return NextResponse.next();
}

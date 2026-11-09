import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const user = session?.user;

  if (!user) {
    return NextResponse.redirect(
      new URL("/sign-in", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
 '/events/my-events', '/events/create','/events/joined-events', '/profile', '/dashboard', '/users/:username','/joined-event/events/:id', '/joined-events/:userId', '/events/user/userId', '/events/:id',
  ],
};



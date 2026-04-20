import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protegir /admin amb Basic Auth
  if (pathname.startsWith("/admin")) {
    const auth = req.headers.get("authorization");
    const password = process.env.ADMIN_PASSWORD ?? "seaandcandles";

    let authorized = false;
    if (auth && auth.startsWith("Basic ")) {
      const decoded = atob(auth.slice(6));
      const [user, pass] = decoded.split(":");
      authorized = user === "admin" && pass === password;
    }

    if (!authorized) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
      });
    }
    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

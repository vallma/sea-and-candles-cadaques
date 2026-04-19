import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all paths except admin, api, _next, and static files
    "/((?!admin|api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};

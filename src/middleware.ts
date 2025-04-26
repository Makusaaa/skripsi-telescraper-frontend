import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware"
import { ModuleRoles, RoleEnum } from "./lib/moduleconstants";

export default withAuth(
  function middleware(req) {
    const res = NextResponse;
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;

    if(!ModuleRoles[pathname]) return res.rewrite(new URL('/',req.url))
    if(!ModuleRoles[req.nextUrl.pathname]?.includes(token!.roles as RoleEnum)) return res.rewrite(new URL('/',req.url))

    return NextResponse.next();
  },
  {
    secret: process.env.NEXT_AUTH_SECRET!,
    callbacks: {
      authorized: ({ token, req }) => {
        if(req.nextUrl.pathname == '/') return true;
        return !!token;
      },
    },
  },
)

export const config = {
    matcher: ["/((?!^$|^/|_next|api|.*\\..*).*)"],
};
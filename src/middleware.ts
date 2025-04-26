import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token)
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
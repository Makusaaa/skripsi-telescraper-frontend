import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 40000,
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET!,
  pages: {
    signIn: "/",
    error: "/",
  },
  session: {
    maxAge: 360000,
  },
  jwt: {
    maxAge: 360000,
  },
  callbacks: {
    async redirect() {
      return "/";
    },
    async jwt({ token, account }) {
      if (account) {
        console.log("token",token);
        console.log("account",account);
        const res = await fetch(
          `${process.env.API_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${account?.id_token}`,
            },
          }
        );
        const resParsed = await res.json();
        if(resParsed.authToken == null)
          throw new Error("Email not registered");
        
        const authToken = jwt.decode(resParsed.authToken)
        token = Object.assign({}, token, {
          id_token: account.id_token,
          myToken: resParsed.authToken,
          roles: authToken!.roles,
          user_id: authToken!.user_id,
        });
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, {
          id_token: token.id_token,
        });
        session = Object.assign({}, session, {
          authToken: token.myToken,
        });
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST, handler };
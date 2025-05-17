import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
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
      strategy: 'jwt',
      maxAge: 360000,
    },
    jwt: {
      maxAge: 360000,
    },
    callbacks: {
      async redirect(p) {
        return p.url;
      },
      async jwt({ token, account }) {
        if (account) {
          console.log(`[TESTING]: ${`${process.env.API_URL}/auth/login`}`)
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
          
          const authToken = jwt.decode(resParsed.authToken)! as { role: number, user_id: number, email: string, name: string, companyid: string}
          token = Object.assign({}, token, {
            email: authToken.email,
            name: authToken.name,
            id_token: account.id_token,
            myToken: resParsed.authToken,
            role: authToken.role,
            user_id: authToken.user_id,
            companyid: authToken.companyid,
          });
        }
        return token;
      },
      async session({ session, token }) {
        if (session) {
          session = Object.assign({}, session, {
            id_token: token.id_token,
            authToken: token.myToken,
            role: token.role,
            userid: token.user_id,
            email: token.email,
            name: token.name,
            companyid: token.companyid,
          });
        }
        return session;
      },
    },
};
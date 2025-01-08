import prisma from "@/prismaClient/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { singingEmailAndPassword } from "@/app/auth/actions/actions";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gamial.com",
        },
        password: { label: "Password", type: "password", placeholder: "****" },
      },
      async authorize(credentials) {
        const user = await singingEmailAndPassword(
          credentials?.email ?? "",
          credentials?.password ?? ""
        );

        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token?.email ?? "no-email" },
      });
      token.roles = dbUser?.roles;
      token.id = dbUser?.id ?? "";
      return token;
    },

    async session({ session, token }) {
     if(session && session.user){
      session.user.roles = token.roles
      session.user.id = token.id
     }
     return session
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

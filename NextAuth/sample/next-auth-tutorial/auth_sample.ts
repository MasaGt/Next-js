// auth config file

import NextAuth, { NextAuthConfig, NextAuthResult } from "next-auth";
import github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

const credentialConfig = Credentials({
  name: "Sample",
  credentials: {
    name: {
      label: "Name Here",
    },
    password: {
      label: "Pass Here",
      type: "password",
    },
  },
  async authorize(credentials) {
    // console.log("----- submitted form now -----");
    if (credentials.name == "a" && credentials.password == "1") {
      return {
        name: "A-san",
      };
    }
    return null;
  },
});

const config = {
  providers: [github, credentialConfig],
  basePath: "/api/sample",
  callbacks: {
    authorized({ request, auth }) {
      console.log(`inside auth.ts:     ${JSON.stringify(auth)}`);

      return !!auth?.user;
    },
  },
} satisfies NextAuthConfig;

const obj = NextAuth(config);

// console.log(obj);

export const { handlers, auth, signIn, signOut } = obj;

"use client";

import React from "react";
// import { auth } from "@/auth";
// import { signIn, signOut } from "@/auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const AppBar = () => {
  // console.log(JSON.stringify(auth));

  // const session = await auth(); // use client 消したら戻す

  const { data: session } = useSession();

  return (
    <div className="p-2 flex gap-2">
      <Link href={"/anotherPage"}>another page</Link>
      <div className="ml-auto">
        {session && session.user ? (
          <div>
            <p>{session.user.name}</p>
            <button type="button" onClick={() => signOut()}>
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <button type="button" onClick={() => signIn()}>
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

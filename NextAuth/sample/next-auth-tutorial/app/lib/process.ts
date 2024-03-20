"use server";

import { signIn, signOut } from "@/auth_sample";

export const login = async () => {
  await signIn();
};

export const logout = async () => {
  await signOut();
};

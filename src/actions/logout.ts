"use server";

import { signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const logout = async () => {
  try {
    await signOut({
      redirectTo: DEFAULT_LOGIN_REDIRECT,
      redirect: true,
    });
  } catch (error) {
    throw error;
  }
};

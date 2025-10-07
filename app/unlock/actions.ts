"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const PASSWORD = "WAGYUDON";
const AUTH_COOKIE = "oishii_auth";
const AUTH_VALUE = "granted";

const ONE_DAY = 60 * 60 * 24;

export async function unlock(
  _prevState: { error?: string },
  formData: FormData
): Promise<{ error?: string }> {
  const password = (formData.get("password") ?? "").toString();
  const redirectTarget = (formData.get("redirectTo") ?? "/").toString();
  const safeRedirect = redirectTarget.startsWith("/") ? redirectTarget : "/";

  if (password.trim() !== PASSWORD) {
    return { error: "Mot de passe incorrect." };
  }

  cookies().set(AUTH_COOKIE, AUTH_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_DAY
  });

  redirect(safeRedirect || "/");
}

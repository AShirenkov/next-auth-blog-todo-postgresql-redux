"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export const GoogleButton = () => {
  const searchPrams = useSearchParams();
  const callbackUrl = searchPrams.get("callbackUrl") || "/profile";
  return (
    <button type="button" onClick={() => signIn("google", { callbackUrl })}>
      Sign in with Google
    </button>
  );
};

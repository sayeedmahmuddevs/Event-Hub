import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const serverToken = async () => {
  const tokens = await auth.api.getToken({
    headers: await headers(),
  });

  if (!tokens?.token) {
    return null;
  }

  return tokens.token;
};
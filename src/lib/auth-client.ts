
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields, jwtClient } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
    plugins: [
    inferAdditionalFields<typeof auth>(),
    jwtClient(),
  ],
  baseURL: "http://localhost:3000",
});

export const {
  signIn,
  signUp,
  useSession,
  signOut,
} = authClient;

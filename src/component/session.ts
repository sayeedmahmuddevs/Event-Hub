
"use client";

import { authClient } from "@/lib/auth-client";


 export const { data: session, isPending } = authClient.useSession();



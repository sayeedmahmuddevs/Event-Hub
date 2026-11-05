
"use client";

import { authClient } from "@/lib/auth-client";
import Navbar from "./Navbar";
import Navbar_2 from "./Navbar_2";

export default function ParentNav() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return null;
  }

  return (
    <>
      {session?.user ? <Navbar_2 /> : <Navbar />}
    </>
  );
}

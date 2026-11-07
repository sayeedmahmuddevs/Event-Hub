
"use client";

import { authClient } from "@/lib/auth-client";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = authClient.useSession();

  const isLoggedIn = !isPending && !!session?.user;

  return (
    <main
      className={
        isLoggedIn
          ? "ml-0 lg:ml-64"
          : "ml-0 lg:mt-18"
      }
    >
      {children}
    </main>
  );
}

"use client";

import EventList from "@/component/EventList";
import Loading from "@/component/loading";
import { authClient } from "@/lib/auth-client";

export default function Page() {
  const session = authClient.useSession();

  const userId = session.data?.user.id;

  if (session.isPending) {
    return <Loading/>;
  }

  if (!userId) {
    return <p>Please login first!</p>;
  }

  const api = `${process.env.NEXT_PUBLIC_CLIENT_LINK}/events/users/${userId}`;

  return (
    <div>
      <EventList api={api} />
    </div>
  );
}
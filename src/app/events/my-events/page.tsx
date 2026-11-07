"use client";

import EventList from "@/component/EventList";
import { authClient } from "@/lib/auth-client";

export default function Page() {
  const session = authClient.useSession();

  const userId = session.data?.user.id;

  if (session.isPending) {
    return <p>Loading user...</p>;
  }

  if (!userId) {
    return <p>Please login first!</p>;
  }

  const api = `http://localhost:8000/events/users/${userId}`;

  return (
    <div>
      <EventList api={api} />
    </div>
  );
}
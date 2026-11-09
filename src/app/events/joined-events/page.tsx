"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { EventType } from "@/type";
import JoinedEventCard from "@/component/JoinedEventCard";
import Loading from "@/component/loading";
import NoEvents from "@/component/NoEvents";

export default function Page() {
  const session = authClient.useSession();
  const user = session.data?.user;

  const [joinedEvents, setJoinedEvents] = useState<EventType[]>([]);

  // Fetch user's joined events
  useEffect(() => {
    if (!user?.id) return;

    const fetchJoinedEvents = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/joined-events/${user.id}`,
          { cache: "no-store" },
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setJoinedEvents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJoinedEvents();
  }, [user?.id]);

  if (session.isPending) {
    return <Loading />;
  }

  if (!user) {
    return <p>Please login first!</p>;
  }

  return (
    <div>
      {joinedEvents.length === 0 ? (
        <NoEvents />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ml-5 mt-5">
          {joinedEvents.map((event) => (
            <JoinedEventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

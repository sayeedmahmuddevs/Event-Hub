"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { EventType } from "@/type";
import JoinedEventCard from "@/component/JoinedEventCard";

type JoinedEventType = {
  _id: string;
  eventId: string;
  userId: string;
  joinedAt: string;
};

export default function Page() {
  const session = authClient.useSession();
  const user = session.data?.user;

  const [joinedEvents, setJoinedEvents] = useState<JoinedEventType[]>([]);
  const [events, setEvents] = useState<EventType[]>([]);

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

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:8000/events", {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  if (session.isPending) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please login first!</p>;
  }

  const eventId = joinedEvents.map((item) => item.eventId);
  const joinedEventAll = events.filter((event) => {
    return eventId.includes(event._id);
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {joinedEventAll.map((event) => (
        <JoinedEventCard key={event._id} event={event} />
      ))}
    </div>
  );
}

"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { EventType } from "@/type";
import JoinedEventCard from "@/component/JoinedEventCard";
import Loading from "@/component/loading";
import NoEvents from "@/component/NoEvents";
import { clientToken } from "@/component/getToken";
import EventSearch from "@/component/Searching";

export default function Page() {
  const session = authClient.useSession();
  const user = session.data?.user;

  const [joinedEvents, setJoinedEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    if (session.isPending) return;

    if (!user?.id) return;

    const controller = new AbortController();

    const fetchJoinedEvents = async () => {
      try {
        const token = await clientToken();
        setLoading(true);

        const res = await fetch(
          `http://localhost:8000/joined-events/${user.id}`,
          {
            cache: "no-store",
            signal: controller.signal,
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch joined events");
        }

        const data = await res.json();

        setJoinedEvents(data);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Joined events fetch error:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchJoinedEvents();

    return () => controller.abort();
  }, [user?.id, session.isPending]);

  if (session.isPending || loading) {
    return <Loading />;
  }

  if (!user) {
    return <p>Please login first!</p>;
  }

 const filteredEvents = joinedEvents.filter((event) => {
  const matchSearch = event.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchCategory =
    category === "all" || event.type === category;

  return matchSearch && matchCategory;
});

  return (
    <div>
        <EventSearch onSearch={setSearch} onCategoryChange={setCategory}/>
      <div>
        {filteredEvents.length === 0 ? (
        <NoEvents />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ml-5 mt-5">
          {filteredEvents.map((event) => (
            <JoinedEventCard key={event._id} event={event} />
          ))}
        </div>
      )}
      </div>
      
    </div>
  );
}

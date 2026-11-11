
"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import type { EventType } from "./JoinedEventCard";
import Image from "next/image";

const PastEvents = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CLIENT_LINK}/pastevents`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch past events");
        }

        const data: EventType[] = await res.json();

        setEvents(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load past events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p className="py-10 text-center">Loading past events...</p>;
  }

  if (error) {
    return <p className="py-10 text-center text-red-500">{error}</p>;
  }

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-3xl font-bold">Past Events</h2>

        {events.length === 0 ? (
          <p className="text-gray-500">
            No past events available.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-lg"
              >
                <Image
                  src={event.thumbnail}
                  alt={event.title}
                  width={600}
                  height={300}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium capitalize text-red-600">
                    {event.type}
                  </span>

                  <h3 className="mt-4 text-xl font-bold">
                    {event.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                    {event.description}
                  </p>

                  <div className="mt-4 space-y-3 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <CalendarDays size={17} />
                      {event.eventDate}
                    </p>

                    <p className="flex items-center gap-2">
                      <Clock size={17} />
                      {event.eventTime}
                    </p>

                    <p className="flex items-center gap-2">
                      <MapPin size={17} />
                      {event.location}
                    </p>
                  </div>

                  <p className="mt-5 border-t pt-3 text-xs text-gray-400">
                    Organized by {event.userName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PastEvents;

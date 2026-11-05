"use client";

import { useEffect, useState } from "react";
import EventCard from "@/component/EventCards";
import { EventType } from "@/type";
import NoEvents from "./NoEvents";

export default function EventList() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:8000/events", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch events");
      }

      const data: EventType[] = await res.json();
      setEvents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadEvents = async () => {
      try {
        const res = await fetch("http://localhost:8000/events", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }

        const data: EventType[] = await res.json();

        if (!ignore) {
          setEvents(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadEvents();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <p className="p-6">Loading events...</p>;
  }

  return (
    <div>
      {events.length === 0 ? (
        <NoEvents />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {events.map((cd) => (
            <EventCard
              key={cd._id}
              cd={cd}
              onUpdated={fetchEvents}
              eventCount={events.length}
            />
          ))}
        </div>
      )}
    </div>
  );
}

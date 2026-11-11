"use client";

import { useEffect, useState } from "react";
import EventCard from "@/component/EventCards";
import { EventType } from "@/type";
import NoEvents from "./NoEvents";
import Loading from "./loading";
import { clientToken } from "./getToken";
import EventSearch from "./Searching";

interface EventListProps {
  api: string;
}

export default function EventList({ api }: EventListProps) {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    let ignore = false;

    const fetchEvents = async () => {
      try {
        const token = await clientToken();
        setLoading(true);

        const res = await fetch(api, {
          cache: "no-store",
          headers: {
            authorization: `Bearer ${token}`,
          },
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

    fetchEvents();

    return () => {
      ignore = true;
    };
  }, [api]);

  const fetchUpdatedEvents = async () => {
    try {
      setLoading(true);
      const token = await clientToken();

      const res = await fetch(api, {
        cache: "no-store",
        headers: {
          authorization: `Bearer ${token}`,
        },
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

  if (loading) {
    return <Loading />;
  }

  const filteredEvents = events.filter((event) => {
    const matchSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category === "all" || event.type === category;

    return matchSearch && matchCategory;
  });

  return (
    <div>
      <EventSearch onSearch={setSearch} onCategoryChange={setCategory} />
      <div>
        {filteredEvents.length === 0 ? (
          <NoEvents />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {filteredEvents.map((cd) => (
              <EventCard
                key={cd._id}
                cd={cd}
                onUpdated={fetchUpdatedEvents}
                eventCount={events.length}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

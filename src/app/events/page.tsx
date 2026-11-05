import { Suspense } from "react";
import EventCard from "@/component/EventCards";
import { EventType } from "@/type";

async function EventList() {
  const res = await fetch("http://localhost:8000/events", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const data: EventType[] = await res.json();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {data.map((cd) => (
        <EventCard key={cd._id} cd={cd} />
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<p className="p-6">Loading events...</p>}>
      <EventList />
    </Suspense>
  );
}
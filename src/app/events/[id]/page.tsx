
import { Suspense } from "react";
import EventDetails from "@/component/EventDetails";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function EventData({ id }: { id: string }) {
  const res = await fetch(
    `http://localhost:8000/events/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return <div>Event not found!</div>;
  }

  const event = await res.json();

  return <EventDetails card={event} />;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<div>Loading event...</div>}>
      <EventData id={id} />
    </Suspense>
  );
}

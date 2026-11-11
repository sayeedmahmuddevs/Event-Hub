
import { Suspense } from "react";
import EventDetails from "@/component/EventDetails";
import Loading from "@/component/loading";
import { serverToken } from "@/component/GetServerToken";


interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function EventData({ id }: { id: string }) {

  
      const token = await serverToken()
  
  const res = await fetch(
    `http://localhost:8000/events/${id}`,
    {
      cache: "no-store",
      headers : {
        authorization :`Bearer ${token}` 
      }
    }
  );

  if (!res.ok) {
    return `<div>Event not found!</div>`;
  }

  const event = await res.json();
  
  

  return <EventDetails card={event} />;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<Loading/>}>
      <EventData id={id} />
    </Suspense>
  );
}

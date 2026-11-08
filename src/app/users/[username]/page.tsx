
import { Suspense } from "react";
import Loading from "@/component/loading";
import UserProfile from "@/component/UserProfile";

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

async function EventData({ username }: { username: string }) {

  
  const res = await fetch(
    `http://localhost:8000/users/${username}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return <div>Event not found!</div>;
  }

  const event = await res.json();
  console.log(event)

  return <UserProfile user={event} />;
}

export default async function Page({ params }: PageProps) {
  const { username } = await params;

  return (
    <Suspense fallback={<Loading/>}>
      <EventData username={username} />
    </Suspense>
  );
}

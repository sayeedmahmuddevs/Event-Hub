
import { Suspense } from "react";
import Loading from "@/component/loading";
import UserProfile from "@/component/UserProfile";
import { serverToken } from "@/component/GetServerToken";

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

async function EventData({ username }: { username: string }) {
  const token = await serverToken()
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_LINK}/users/${username}`,
    {
      cache: "no-store",
      headers: {
              authorization: `Bearer ${token}`,
            },
      
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


"use client";

import Image from "next/image";
import { EventType, JoinedEventType } from "@/type";
import {
  CalendarDays,
  MapPin,
  Clock,
  UserRound,
  Tag,
  ArrowRight,
  Users,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import formatEventDate from "./DateFormate";
import Link from "next/link";
import { clientToken } from "./getToken";

interface EventDetailsProps {
  card: EventType;
}

interface OrganizerType {
  name: string;
  image?: string;
}

export default function EventDetails({ card }: EventDetailsProps) {
  const session = authClient.useSession();
  const user = session.data?.user;

  const [organizer, setOrganizer] = useState<OrganizerType | null>(null);
  const [eventPeople, setEventPeople] = useState<JoinedEventType[]>([]);
  const [loading, setLoading] = useState(false);

  // Check whether current user joined this event
  const isJoined = eventPeople.some(
    (item) =>
      item.eventId === card._id &&
      item.userId === user?.id
  );

  // Fetch Organizer Information
  useEffect(() => {
    if (!card.userId) return;

    const controller = new AbortController();

    const fetchOrganizer = async () => {
      try {
        const token = await clientToken()
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CLIENT_LINK}/user/${card.userId}`,
          {
            signal: controller.signal,
            cache: "no-store",
             headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("User not found");
        }

        const data: OrganizerType = await res.json();

        if (!controller.signal.aborted) {
          setOrganizer(data);
        }

      } catch (error) {
        if (
          error instanceof Error &&
          error.name !== "AbortError"
        ) {
          console.error("Organizer fetch error:", error);
        }
      }
    };

    fetchOrganizer();

    return () => controller.abort();

  }, [card.userId]);


  // Fetch Joined People
  useEffect(() => {
    if (!card._id) return;

    const controller = new AbortController();

    const fetchPeople = async () => {
      try {
        const token = await clientToken()
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CLIENT_LINK}/joined-event/events/${card._id}`,
          {
            cache: "no-store",
            signal: controller.signal,
             headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch joined people");
        }

        const data: JoinedEventType[] = await res.json();

        if (!controller.signal.aborted) {
          setEventPeople(data);
        }

      } catch (error) {
        if (
          error instanceof Error &&
          error.name !== "AbortError"
        ) {
          console.error("Joined people fetch error:", error);
        }
      }
    };

    fetchPeople();

    return () => controller.abort();

  }, [card._id]);


  // Refresh Joined People
  const refreshEventPeople = async () => {
    
    try {
      const token = await clientToken()
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_LINK}/joined-event/events/${card._id}`,
        {
          cache: "no-store",
           headers: {
              authorization: `Bearer ${token}`,
            },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to refresh joined people");
      }

      const data: JoinedEventType[] = await res.json();

      setEventPeople(data);

    } catch (error) {
      console.error("Refresh error:", error);
    }
  };


  // Join Event
  const handleEventJoined = async () => {
    if (!user) {
      toast.error("Please login first!");
      return;
    }

    if (loading) return;

    if (isJoined) {
      toast.info("You have already joined this event!");
      return;
    }

    try {
      const token = await clientToken()
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_LINK}/joined-events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            
          },
          body: JSON.stringify({
            eventId: card._id,
            userId: user.id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Join failed");
      }

      toast.success("You have joined successfully!");

      await refreshEventPeople();

    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );

    } finally {
      setLoading(false);
    }
  };


  // Cancel / Leave Event
  const handleDeleteEvent = async () => {
    if (!user) {
      toast.error("Please login first!");
      return;
    }

    if (loading) return;

    try {
      const token = await clientToken()
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_LINK}/joined-events/${card._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            
          },
          body: JSON.stringify({
            userId: user.id,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Cancel failed");
      }

      toast.success("You left the event!");

      await refreshEventPeople();

    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );

    } finally {
      setLoading(false);
    }
  };


  const { formattedDate, formattedTime } = formatEventDate(
    card.eventDate,
    card.eventTime
  );


  return (
    <div className="min-h-screen dark:bg-black bg-slate-50 px-4 py-10">

      <div className="mx-auto max-w-4xl">

        {/* Event Image */}
        <div className="relative h-64 overflow-hidden rounded-2xl md:h-96">

          <Image
            src={card.thumbnail}
            alt={card.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
          />

          <Badge className="absolute right-5 top-5 capitalize bg-violet-600">
            {card.type}
          </Badge>

        </div>


        {/* Event Title */}
        <div className="mb-7 mt-7">

          <h1 className="text-3xl font-bold capitalize dark:text-slate-100 text-slate-900 md:text-4xl">
            {card.title}
          </h1>

          <p className="mt-3 leading-7 text-slate-600">
            {card.description}
          </p>

        </div>


        {/* Event Information */}
        <Card className="rounded-2xl border-none shadow-sm">

          <CardContent className="grid gap-7 p-6">

            <div className="sm:grid-cols-2 grid gap-7">

              <Info
                icon={<CalendarDays />}
                title="Event Date"
                value={formattedDate}
              />

              <Info
                icon={<Clock />}
                title="Starting Time"
                value={formattedTime}
              />

              <Info
                icon={<MapPin />}
                title="Location"
                value={card.location}
              />

              <Info
                icon={<Tag />}
                title="Event Category"
                value={card.type}
              />

              <Info
                icon={<UserRound />}
                title="Organizer"
                value={card.userName}
              />

              <Info
                icon={<Users />}
                title="Joined People"
                value={String(eventPeople.length)}
              />

            </div>

          </CardContent>

        </Card>


        {/* Organizer Details */}
        <Card className="mt-6 rounded-2xl border-none shadow-sm">

          <CardContent className="flex items-center justify-between gap-4 p-6">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-violet-600 overflow-hidden">

                {organizer?.image ? (
                  <Image
                    src={organizer.image}
                    alt="Organizer"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound />
                )}

              </div>

              <div>

                <h3 className="font-semibold dark:text-slate-100 text-slate-900">
                  {organizer?.name || "Loading..."}
                </h3>

                <p className="text-sm text-slate-500">
                  {card.userName}
                </p>

              </div>

            </div>

            <Link href={`/users/${card.userName}`}>

              <Button>
                <ArrowRight className="ml-2" />
                View Profile
              </Button>

            </Link>

          </CardContent>

        </Card>


        {/* Event Action */}
        <div className="mt-6 flex flex-wrap gap-4">

          {!isJoined ? (

            <Button
              size="lg"
              disabled={loading || session.isPending}
              className="flex-1 rounded-xl bg-violet-600 hover:bg-violet-700"
              onClick={handleEventJoined}
            >
              {loading ? "Please wait..." : "Join Event"}
            </Button>

          ) : (

            <Button
              size="lg"
              disabled={loading}
              className="flex-1 rounded-xl bg-red-600 hover:bg-red-700"
              onClick={handleDeleteEvent}
            >
              {loading ? "Please wait..." : "Cancel Event"}
            </Button>

          )}

        </div>

      </div>

    </div>
  );
}


// Reusable Info Component
function Info({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {

  return (
    <div className="flex items-start gap-3">

      <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-sm  dark:text-slate-200">
          {title}
        </p>

        <p className="mt-1 break-all font-semibold capitalize dark:text-slate-500 text-slate-800">
          {value}
        </p>

      </div>

    </div>
  );
}

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

  // Fetch organizer information
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:8000/user/${card.userId}`);

        if (!res.ok) {
          throw new Error("User not found");
        }

        const data = await res.json();
        setOrganizer(data);
      } catch (error) {
        console.error("Organizer fetch error:", error);
      }
    };

    if (card.userId) {
      fetchUser();
    }
  }, [card.userId]);

// single event joned people
  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/joined-event/events/${card._id}`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        throw new Error("User not found");
      }

      const data = await res.json();
      setEventPeople(data);

    } catch (error) {
      console.error(error);
    }
  };

  if (card._id) {
    fetchUser();
  }
}, [card._id]);

  // added event

  const handleEventJoined = async () => {
    if (!user) {
      toast.error("Please login first!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/joined-events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: card._id,
          userId: user.id,
        }),
      });
      const data = await response.json();

      if (data.message) {
        toast.error(data.message);
      } else {
        toast.success("You have joined successful");
      }

      console.log(data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  const { formattedDate, formattedTime } = formatEventDate(
    card.eventDate,
    card.eventTime,
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
          <h1 className="text-3xl font-bold capitalize text-slate-900 md:text-4xl">
            {card.title}
          </h1>

          <p className="mt-3 leading-7 text-slate-600">{card.description}</p>
        </div>

        {/* Event Information */}
        <Card className="rounded-2xl border-none shadow-sm">
          <CardContent className="grid gap-7 p-6 sm:grid-cols-2">
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

            <Info icon={<MapPin />} title="Location" value={card.location} />

            <Info icon={<Tag />} title="Event Category" value={card.type} />

            <Info
              icon={<UserRound />}
              title="Organizer"
              value={card.userName}
            />

            <Info icon={<Users />} title="Joined People" value={String(eventPeople.length)} />
          </CardContent>
        </Card>

        {/* Organizer Details */}
        <Card className="mt-6 rounded-2xl border-none shadow-sm">
          <CardContent className="flex items-center justify-between gap-4 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-violet-600 overflow-hidden">
                <Image
                  src={organizer?.image || ""}
                  alt={"image"}
                  width={40}
                  height={40}
                  className="w-full"
                />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  {organizer?.name}
                </h3>
                <p className="text-sm text-slate-500">{card.userName}</p>
              </div>
            </div>
            <Link href={`/users/${card.userName}`}>
              <Button className="">
              <ArrowRight className="ml-2" />
              View Profile
            </Button>
            </Link>
            
          </CardContent>
        </Card>

        {/* Event Action */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            size="lg"
            className="flex-1 rounded-xl bg-violet-600 hover:bg-violet-700"
            onClick={handleEventJoined}
          >
            Join Event
          </Button>
        </div>
      </div>
    </div>
  );
}

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
      <div className="rounded-xl bg-violet-50 p-3 text-violet-600">{icon}</div>

      <div className="min-w-0">
        <p className="text-sm text-slate-500">{title}</p>
        <p className="mt-1 break-all font-semibold capitalize text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

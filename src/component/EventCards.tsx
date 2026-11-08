"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, CalendarDays, MapPin, User, UserCheck, Users } from "lucide-react";
import Image from "next/image";
import { EventType } from "@/type";
import Link from "next/link";
import EditEvents from "./EditEvents";
import { DeleteEvent } from "./DeleteEvent";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

interface eventCardProps {
  cd: EventType;
  onUpdated: () => void;
  eventCount: number;
}

export default function EventCard({ cd, onUpdated }: eventCardProps) {
  const [eventPeople, setEventPeople] = useState([])
  const session = authClient.useSession();
  const user = session.data?.user;

  const isWoner = user?.id === cd.userId;

  
useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/joined-event/events/${cd._id}`,
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

  if (cd._id) {
    fetchUser();
  }
}, [cd._id]);

  console.log(eventPeople)

  return (
    <Card className=" overflow-hidden max-w-sm rounded-xl shadow-md hover:shadow-lg transition-shadow">
      {/* Thumbnail */}
      <div className="relative h-52 w-full">
        <Image
          src={cd.thumbnail}
          alt={cd.title}
          width={96}
          height={80}
          className="h-full w-full object-cover"
        />

        <Badge className="absolute top-3 right-3 capitalize">{cd.type}</Badge>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-xl capitalize">{cd.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{cd.description}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>
            {new Date(cd.eventDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="capitalize">{cd.location}</span>
        </div>
            <hr className="" />
        <div className="flex items-center justify-between">
            <div className="flex gap-1">
             <Users size={12} strokeWidth={3}/> <span className="text-md font-semibold">{eventPeople.length}</span>
            </div>

          <div className="flex gap-1">
            <div className="flex items-center gap-2">
              <User className="h-4  w-4 text-muted-foreground" strokeWidth={4} />
            </div>

            <span className="text-sm opacity-70 font-semibold">
              {cd.userName}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 border-t pt-4">
        <Button className="w-full rounded-lg">
          <Link href={`/events/${cd._id}`} className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Link>
        </Button>

        {isWoner && (
          <>
            <button>
              <EditEvents event={cd} onEdited={onUpdated} />
            </button>

            <button>
              <DeleteEvent id={cd._id} onDeleted={onUpdated} />
            </button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}

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
import { Eye, CalendarDays, MapPin, User, Users, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { EventType, JoinedEventType } from "@/type";
import Link from "next/link";
import EditEvents from "./EditEvents";
import { DeleteEvent } from "./DeleteEvent";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";


interface eventCardProps {
  cd: EventType;
  onUpdated: () => void;
  eventCount: number;
}

export default function EventCard({ cd, onUpdated }: eventCardProps) {
  const path = usePathname()
  const session = authClient.useSession();
  const user = session.data?.user;
  const [eventPeople, setEventPeople] = useState<JoinedEventType[]>([]);
  
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
  const isJoined = eventPeople.some(
    (item) => item.eventId === cd._id
  )


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
        <div>
        <Badge className="absolute top-3 left-3 bg-green-600 hover:bg-green-600 text-white gap-1">
          <CheckCircle2 className="h-3.5 w-3.5" />
          {isJoined? "Joined" : "Join"}
        </Badge>
        <Badge className="absolute top-3 right-3 capitalize">{cd.type}</Badge>
        </div>
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

      <CardFooter className="flex justify-between border-t pt-4">
        <Button className="rounded-lg">
          <Link href={`/events/${cd._id}`} className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Link>
        </Button>

        {isWoner && path!=="/events" &&  (
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

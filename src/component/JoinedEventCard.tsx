import Image from "next/image";
import { CalendarDays, Clock, MapPin, User, CheckCircle2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import formatEventDate from "./DateFormate";

export type EventType = {
  _id: string;
  title: string;
  description: string;
  eventDate: string;
  eventTime: string;
  location: string;
  thumbnail: string;
  type: string;
  userId: string;
  userName: string;
};

type JoinedEventCardProps = {
  event: EventType;
};


export default function JoinedEventCard({ event }: JoinedEventCardProps) {
    // formateDate
    const {formattedDate, formattedTime} = formatEventDate(event.eventDate, event.eventTime)


  return (
    <Card className="overflow-hidden rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative h-40 w-full">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        <Badge className="absolute top-3 left-3 bg-green-600 hover:bg-green-600 text-white gap-1">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Joined
        </Badge>

        <Badge
          variant="secondary"
          className="absolute top-3 right-3 capitalize"
        >
          {event.type}
        </Badge>
      </div>

      <CardContent className="py-2 space-y-2">
        {/* Title and Description */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold line-clamp-1">{event.title}</h2>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>
        </div>

        <Separator />

        {/* Event Information */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-3 text-sm">
              <CalendarDays className="h-4 w-4 text-primary" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span>{formattedTime}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        <Separator />

        {/* Organizer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Organized by</span>
          </div>

          <span className="text-sm font-semibold">{event.userName}</span>
        </div>
        <Button className="w-full rounded-lg">
          <Link href={`/events/${event._id}`} className="flex items-center">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

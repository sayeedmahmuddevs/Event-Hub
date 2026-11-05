
"use client";

import Image from "next/image";
import { EventType } from "@/type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Hash } from "lucide-react";

interface EventDetailsProps {
  card: EventType
}

export default function EventDetails({ card }: EventDetailsProps) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="overflow-hidden rounded-2xl shadow-lg">

        {/* Event Image */}
        <div className="relative h-72 md:h-96 w-full">
          <Image
            src={card.thumbnail}
            alt={card.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />

          <Badge className="absolute top-4 right-4 capitalize">
            {card.type}
          </Badge>
        </div>

        <CardHeader>
          <CardTitle className="text-3xl capitalize">
            {card.title}
          </CardTitle>

          <p className="text-muted-foreground leading-relaxed">
            {card.description}
          </p>
        </CardHeader>

        <CardContent className="space-y-5">

          {/* Event Date */}
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Event Date</p>
              <p className="font-medium">
                {new Date(card.eventDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium capitalize">{card.location}</p>
            </div>
          </div>

          {/* Event ID */}
          <div className="flex items-center gap-3">
            <Hash className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Event ID</p>
              <p className="font-medium text-sm break-all">
                {card._id}
              </p>
            </div>
          </div>

          {/* Join Button */}
          <Button className="w-full mt-4" size="lg">
            Join Event
          </Button>

        </CardContent>
      </Card>
    </div>
  );
}

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
import {
  Eye,
  Pencil,
  Trash2,
  CalendarDays,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { EventType } from "@/type";
import Link from "next/link";
import EditEvents from "./EditEvents";
import { DeleteEvent } from "./DeleteEvent";

interface eventCardProps{
    cd: EventType
}


export default function EventCard({ cd }: eventCardProps) {
    console.log("new Evendsjskdalfj;s",cd)
  

  const handleView = (id: string) => {
    console.log("View event:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete event:", id);
  };

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

        <Badge className="absolute top-3 right-3 capitalize">
          {cd.type}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-xl capitalize">
          {cd.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {cd.description}
        </p>
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
      </CardContent>

      <CardFooter className="flex gap-2 border-t pt-4">
        <Link href = {`/events/${cd._id}`}>
            <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => handleView(cd._id)}
        >
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
        </Link>
        
            <button>
                <EditEvents event={cd}/>
            </button>
        
            <button>
                <DeleteEvent event = {cd}/>
            </button>
        
      </CardFooter>
    </Card>
  );
}

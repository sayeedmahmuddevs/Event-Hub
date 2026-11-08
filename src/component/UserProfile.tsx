"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  CalendarDays,
  MapPin,
  Users,
  Mail,
  ArrowRight,
  CalendarCheck,
  Heart,
  UserRound,
  LayoutDashboard,
  UserCircle,
} from "lucide-react";
import { UserType } from "@/type";
import { EventType } from "./JoinedEventCard";
import Loading from "./loading";
import EventCard from "./EventCards";
import EventList from "./EventList";
interface ProfileUserType {
  user: UserType;
}


export default function UserProfile({ user }: ProfileUserType) {
  const [activeTab, setActiveTab] = useState<"events" | "details">("events");
  const [userEvent, setUserEvent] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const fetchUserEvents = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:8000/events/users/${user._id}`,
          {
            cache: "no-store",
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }

        const data: EventType[] = await res.json();

        if (!ignore) {
          setUserEvent(data);
        }
      } catch (error) {
        if (!ignore) {
          console.error(error);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchUserEvents();

    return () => {
      ignore = true;
    };
  }, [user._id]);

  const api = `http://localhost:8000/events/users/${user._id}`;

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Profile Banner */}
        <Card className="overflow-hidden rounded-3xl border-0 shadow-md">
          <div className="h-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

          <CardContent className="relative px-6 pb-8">
            <div className="-mt-16 flex flex-col gap-5 sm:flex-row sm:items-end">
              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-blue-100 shadow-lg">
                <Image
                  src={user.image}
                  alt={user.name}
                  width={128}
                  height={128}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="pb-1">
                <h1 className="text-3xl font-black text-slate-900">
                  {user.name}
                </h1>

                <p className="font-semibold text-blue-600">{user.username}</p>

                <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  {user.bio ? user.bio : "no bio here"}
                </p>
              </div>

              <Badge className="w-fit bg-blue-100 text-blue-700 hover:bg-blue-100 sm:ml-auto">
                <Heart size={14} className="mr-2" />
                EventHub Member
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="sticky top-16 z-20 rounded-2xl border bg-white p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveTab("events")}
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                activeTab === "events"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <LayoutDashboard size={18} />
              Created Events
            </button>

            <button
              onClick={() => setActiveTab("details")}
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                activeTab === "details"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <UserCircle size={18} />
              User Details
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "events" ? (
          /* Created Events */
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-900">
                Created Events
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Events organized by {user.name}.
              </p>
            </div>

            <div>
              <EventList api={api} />
            </div>
          </section>
        ) : (
          /* User Details */
          <section className="space-y-6">
            {/* User Information */}
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                    <UserRound size={24} />
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-slate-900">
                      Personal Information
                    </h2>
                    <p className="text-sm text-slate-500">
                      User profile details
                    </p>
                  </div>
                </div>

                <Separator className="mb-6" />

                <div className="grid gap-6 sm:grid-cols-2">
                  <DetailItem label="Full Name" value={user.name} />
                  <DetailItem
                    label="Username"
                    value={user.username as string}
                  />
                  <DetailItem
                    label="Location"
                    value={
                      user.location
                        ? user.location
                        : ("No location here" as string)
                    }
                  />
                  <DetailItem
                    label="Phone"
                    value={
                      user.phone ? user.phone : ("No Phone here" as string)
                    }
                  />
                  <DetailItem
                    label="Profession"
                    value={
                      user.profession
                        ? user.profession
                        : ("No Profession here" as string)
                    }
                  />
                  <DetailItem
                    label="Website"
                    value={
                      user.website
                        ? user.website
                        : ("No website here" as string)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard
                icon={<CalendarDays />}
                title="Created Events"
                count={userEvent.length}
              />

              <StatCard
                icon={<CalendarCheck />}
                title="Joined Events"
                count={userEvent.length}
              />

              <StatCard
                icon={<Users />}
                title="Total Activities"
                count={userEvent.length + userEvent.length}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// Detail Item
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="break-all font-bold text-slate-800">{value}</p>
    </div>
  );
}

// Statistics
function StatCard({
  icon,
  title,
  count,
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
}) {
  return (
    <div className="rounded-2xl bg-blue-50 p-6">
      <div className="mb-3 text-blue-600">{icon}</div>
      <h2 className="text-3xl font-black text-slate-900">{count}</h2>
      <p className="mt-1 font-semibold text-slate-500">{title}</p>
    </div>
  );
}

// Event Card
// function EventCard({ event }: { event: (typeof events)[number] }) {
//   return (
//     <Card className="group overflow-hidden rounded-2xl border-0 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
//       <div className="relative h-48">
//         <Image
//           src={event.thumbnail}
//           alt={event.title}
//           fill
//           unoptimized
//           className="object-cover transition duration-500 group-hover:scale-105"
//         />

//         <Badge className="absolute right-3 top-3 capitalize">
//           {event.type}
//         </Badge>
//       </div>

//       <CardContent className="space-y-4 p-5">
//         <div>
//           <h3 className="text-lg font-bold text-slate-900">{event.title}</h3>

//           <p className="mt-2 line-clamp-2 text-sm text-slate-500">
//             {event.description}
//           </p>
//         </div>

//         <div className="space-y-2 text-sm text-slate-500">
//           <p className="flex items-center gap-2">
//             <CalendarDays size={16} />
//             {event.eventDate}
//           </p>

//           <p className="flex items-center gap-2">
//             <MapPin size={16} />
//             {event.location}
//           </p>
//         </div>

//         <Separator />

//         <Button className="w-full">
//           <Link href={`/events/${event._id}`}>
//             View Details
//             <ArrowRight className="ml-2 h-4 w-4" />
//           </Link>
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  CalendarDays,
  Users,
  CalendarCheck,
  Heart,
  UserRound,
  LayoutDashboard,
  UserCircle,
} from "lucide-react";
import { UserType } from "@/type";
import { EventType } from "./JoinedEventCard";
import Loading from "./loading";
import EventList from "./EventList";
import { clientToken } from "./getToken";
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
        const token = await clientToken()
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CLIENT_LINK}/events/users/${user._id}`,
          {
            cache: "no-store",
             headers: {
              authorization: `Bearer ${token}`,
            },
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

  const api = `${process.env.NEXT_PUBLIC_CLIENT_LINK}/events/users/${user._id}`;

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen dark:bg-gray-800 bg-slate-50 px-4 py-10 sm:px-6">
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
                <h1 className="text-3xl font-black dark:text-slate-100 text-slate-900">
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
        <div className="sticky top-16 z-20 rounded-2xl border dark:bg-gray-800 bg-white p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveTab("events")}
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                activeTab === "events"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-500 hover:bg-blue-600 hover:text-slate-50"
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
                  : "text-slate-500 hover:bg-blue-600 hover:text-slate-50"
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
              <h2 className="text-2xl font-black dark:text-gray-100 text-slate-900">
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
                    <h2 className="text-xl font-black dark:text-slate-100 text-slate-900">
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
    <div className="rounded-xl dark:bg-gray-800 bg-slate-50 p-4">
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="break-all font-bold dark:text-slate-100 text-slate-800">{value}</p>
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
    <div className="rounded-2xl dark:bg-gray-700 bg-blue-50 p-6">
      <div className="mb-3 dark:text-blue-100 text-blue-600">{icon}</div>
      <h2 className="text-3xl font-black dark:text-slate-100 text-slate-900">{count}</h2>
      <p className="mt-1 font-semibold dark:text-slate-200 text-slate-500">{title}</p>
    </div>
  );
}


"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Pencil,
  CalendarDays,
  MapPin,
  Image as ImageIcon,
  FileText,
  Type,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import { EventType } from "@/type";
import { authClient } from "@/lib/auth-client";
import { clientToken } from "./getToken";

interface EditEventsProps {
  event: EventType;
  onEdited?: () => void;
}

export default function EditEvents({ event, onEdited }: EditEventsProps) {
  const session = authClient.useSession();
  const user = session.data?.user;
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const eventData = Object.fromEntries(formData.entries());
      const token = await clientToken();

      if (!event?._id) {
        toast.error("Event ID not found!");
        return;
      }

      if (!user?.id) {
        toast.error("Please login first!");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_LINK}/events/${event._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: user?.id,
            ...eventData,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Event update failed");
      }

      toast.success("Event updated successfully!");
      setOpen(false);
      onEdited?.();
      console.log("singleData", data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong!",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline" size="sm" className="flex-1">
          <Pencil className="h-4 w-4 mr-1" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-2xl max-h-[90dvh] overflow-y-auto rounded-3xl p-4 sm:p-6 lg:p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Edit Event Information
          </DialogTitle>

          <DialogDescription>
            Update your existing event information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <Label>Event Title</Label>
            <div className="relative">
              <Type className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                name="title"
                defaultValue={event.title}
                required
                className="h-12 rounded-xl bg-slate-50 pl-11"
              />
            </div>
          </div>

          {/* Type and Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Event Type</Label>

              <Select name="type" defaultValue={event.type} required>
                <SelectTrigger className="h-12 rounded-xl bg-slate-50">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="winter-clothing">
                    Winter Clothing Donation
                  </SelectItem>
                  <SelectItem value="food-donation">Food Donation</SelectItem>
                  <SelectItem value="volunteer">Volunteer Event</SelectItem>
                  <SelectItem value="fundraising">Fundraising</SelectItem>
                  <SelectItem value="community">Community Support</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Event Date</Label>
              <div className="relative">
                <CalendarDays className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  name="eventDate"
                  type="date"
                  defaultValue={event.eventDate?.slice(0, 10)}
                  required
                  className="h-12 rounded-xl bg-slate-50 pl-11"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label>Event Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                name="location"
                defaultValue={event.location}
                required
                className="h-12 rounded-xl bg-slate-50 pl-11"
              />
            </div>
          </div>

          {/* Thumbnail URL */}
          <div className="space-y-2">
            <Label>Thumbnail Image URL</Label>
            <div className="relative">
              <ImageIcon className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                name="thumbnail"
                type="url"
                defaultValue={event.thumbnail}
                required
                className="h-12 rounded-xl bg-slate-50 pl-11"
              />
            </div>
            <p className="text-xs text-slate-400">
              You can edit or replace your existing image URL.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Event Description</Label>
            <div className="relative">
              <FileText className="absolute left-3.5 top-4 h-5 w-5 text-slate-400" />
              <Textarea
                name="description"
                defaultValue={event.description}
                rows={5}
                required
                className="resize-none rounded-xl bg-slate-50 pl-11 pt-3"
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="h-12 w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-base font-bold text-white"
          >
            <Send size={18} className="mr-2" />
            Update Event
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

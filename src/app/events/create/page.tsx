"use client";

import { useState } from "react";
import {
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
import { motion } from "framer-motion";
import { toast } from "sonner";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateEvent() {
  const [thumbnail, setThumbnail] = useState("");
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const formData = new FormData(e.currentTarget);
    const eventData = Object.fromEntries(formData.entries());

    const response = await fetch("http://localhost:8000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Event creation failed");
    }

    console.log("Event created:", data);

    toast.success("Event created successfully!");

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="min-h-screen bg-[#f5f4fa] px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-3xl"
      >
        {/* Form Card */}

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-violet-900/5 sm:p-9"
        >
          <div className="mb-8 border-b border-slate-100 pb-6">
            <h2 className="text-xl font-bold text-slate-800">
              Event Information
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Provide all the necessary information about your event.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Title */}

            <div className="space-y-2">
              <Label htmlFor="title" className="font-semibold text-slate-700">
                Event Title
              </Label>

              <div className="relative">
                <Type className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <Input
                  id="title"
                  name="title"
                  placeholder="Enter your event title"
                  required
                  className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-11 focus-visible:ring-violet-500"
                />
              </div>
            </div>

            {/* Event Type */}

            <div className="flex justify-between">
              <div className="space-y-2">
                <Label htmlFor="type" className="font-semibold text-slate-700">
                  Event Type
                </Label>

                <Select name="type" required>
                  <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:ring-violet-500">
                    <SelectValue placeholder="Select event category" />
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

              {/* Event Date */}

              <div className="space-y-2">
                <Label
                  htmlFor="eventDate"
                  className="font-semibold text-slate-700"
                >
                  Event Date
                </Label>

                <div className="relative">
                  <CalendarDays className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <Input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    required
                    className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-11 focus-visible:ring-violet-500"
                  />
                </div>
              </div>
            </div>
            {/* Location */}

            <div className="space-y-2">
              <Label
                htmlFor="location"
                className="font-semibold text-slate-700"
              >
                Event Location
              </Label>

              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <Input
                  id="location"
                  name="location"
                  placeholder="Enter event location"
                  required
                  className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-11 focus-visible:ring-violet-500"
                />
              </div>
            </div>

            {/* Thumbnail URL */}

            <div className="space-y-2">
              <Label
                htmlFor="thumbnail"
                className="font-semibold text-slate-700"
              >
                Thumbnail Image URL
              </Label>

              <div className="relative">
                <ImageIcon className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <Input
                  id="thumbnail"
                  name="thumbnail"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  required
                  className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-11 focus-visible:ring-violet-500"
                />
              </div>

              <p className="text-xs text-slate-400">
                Paste your event image URL here.
              </p>
            </div>

            {/* Description */}

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="font-semibold text-slate-700"
              >
                Event Description
              </Label>

              <div className="relative">
                <FileText className="absolute left-3.5 top-4 h-5 w-5 text-slate-400" />

                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your event, its purpose and activities..."
                  rows={6}
                  required
                  className="resize-none rounded-xl border-slate-200 bg-slate-50 pl-11 pt-3 focus-visible:ring-violet-500"
                />
              </div>
            </div>

            {/* Submit */}

            <Button
              type="submit"
              className="h-13 w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-base font-bold text-white shadow-lg shadow-violet-500/20 transition hover:from-violet-700 hover:to-indigo-700"
            >
              <Send size={18} className="mr-2" />
              Create Event
            </Button>
          </form>
        </motion.div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Made with care by EventHub
        </p>
      </motion.div>
    </div>
  );
}

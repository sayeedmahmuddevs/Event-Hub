
"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
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

import { authClient } from "@/lib/auth-client";

export default function CreateEvent() {
  const userData = authClient.useSession();
  const user = userData.data?.user;

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [thumbnail, setThumbnail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userData.isPending) {
      toast.info("Loading user...");
      return;
    }

    try {
      const formData = new FormData(e.currentTarget);
      const eventData = Object.fromEntries(formData.entries());

      const datas = {
        userName: "@" + user?.email?.split("@")[0],
        userId: user?.id,
        ...eventData,
        createdDate: new Date().toLocaleString("en-US"),
      };

      const response = await fetch("http://localhost:8000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datas),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Event creation failed");
      }

      toast.success("Event created successfully!");
      e.currentTarget.reset();
      setThumbnail("");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong!"
      );
    }
  };

  const labelClass = `font-semibold ${
    isDark ? "text-gray-200" : "text-slate-700"
  }`;

  const inputClass = `h-12 rounded-xl pl-11 transition-colors ${
    isDark
      ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus-visible:ring-violet-500"
      : "border-slate-200 bg-slate-50 text-gray-900 placeholder:text-slate-400 focus-visible:ring-violet-500"
  }`;

  const selectClass = `h-12 rounded-xl ${
    isDark
      ? "border-gray-700 bg-gray-800 text-white"
      : "border-slate-200 bg-slate-50 text-gray-900"
  }`;

  return (
    <div
      className={`min-h-screen px-4 py-12 transition-colors duration-300 sm:px-6 ${
        isDark ? "bg-[#0f0d20]" : "bg-[#f5f4fa]"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-3xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`rounded-3xl border p-5 shadow-xl transition-colors duration-300 sm:p-9 ${
            isDark
              ? "border-gray-800 bg-[#17152f] shadow-black/20"
              : "border-slate-200 bg-white shadow-violet-900/5"
          }`}
        >
          {/* Header */}

          <div
            className={`mb-8 border-b pb-6 ${
              isDark ? "border-gray-700" : "border-slate-100"
            }`}
          >
            <h2
              className={`text-xl font-bold ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              Event Information
            </h2>

            <p
              className={`mt-2 text-sm ${
                isDark ? "text-gray-400" : "text-slate-400"
              }`}
            >
              Provide all the necessary information about your event.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Event Title */}

            <div className="space-y-2">
              <Label htmlFor="title" className={labelClass}>
                Event Title
              </Label>

              <div className="relative">
                <Type className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <Input
                  id="title"
                  name="title"
                  placeholder="Enter your event title"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Event Type, Date and Time */}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Event Type */}

              <div className="space-y-2">
                <Label htmlFor="type" className={labelClass}>
                  Event Type
                </Label>

                <Select name="type" required>
                  <SelectTrigger className={selectClass}>
                    <SelectValue placeholder="Select event category" />
                  </SelectTrigger>

                  <SelectContent
                    className={
                      isDark
                        ? "border-gray-700 bg-[#17152f] text-white"
                        : ""
                    }
                  >
                    <SelectItem value="winter-clothing">
                      Winter Clothing Donation
                    </SelectItem>

                    <SelectItem value="food-donation">
                      Food Donation
                    </SelectItem>

                    <SelectItem value="volunteer">
                      Volunteer Event
                    </SelectItem>

                    <SelectItem value="fundraising">
                      Fundraising
                    </SelectItem>

                    <SelectItem value="community">
                      Community Support
                    </SelectItem>

                    <SelectItem value="other">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Event Date */}

              <div className="space-y-2">
                <Label htmlFor="eventDate" className={labelClass}>
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
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Event Time */}

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="eventTime" className={labelClass}>
                  Event Start Time
                </Label>

                <Input
                  id="eventTime"
                  name="eventTime"
                  type="time"
                  required
                  className={selectClass}
                />
              </div>
            </div>

            {/* Location */}

            <div className="space-y-2">
              <Label htmlFor="location" className={labelClass}>
                Event Location
              </Label>

              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <Input
                  id="location"
                  name="location"
                  placeholder="Enter event location"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Thumbnail URL */}

            <div className="space-y-2">
              <Label htmlFor="thumbnail" className={labelClass}>
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
                  className={inputClass}
                />
              </div>

              <p
                className={`text-xs ${
                  isDark ? "text-gray-500" : "text-slate-400"
                }`}
              >
                Paste your event image URL here.
              </p>
            </div>

            {/* Description */}

            <div className="space-y-2">
              <Label htmlFor="description" className={labelClass}>
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
                  className={`resize-none rounded-xl pl-11 pt-3 transition-colors ${
                    isDark
                      ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus-visible:ring-violet-500"
                      : "border-slate-200 bg-slate-50 text-gray-900 placeholder:text-slate-400 focus-visible:ring-violet-500"
                  }`}
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

        <p
          className={`mt-6 text-center text-xs ${
            isDark ? "text-gray-500" : "text-slate-400"
          }`}
        >
          Made with care by EventHub ❤️
        </p>
      </motion.div>
    </div>
  );
}

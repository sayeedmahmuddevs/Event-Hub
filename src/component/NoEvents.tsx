
"use client";

import { CalendarDays, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NoEvents() {
  const usePath = usePathname();

  const isPath =
    usePath === "/events/joined-events"
      ? "/events"
      : "/events/create";

  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center bg-[#f5f4fa] px-4 py-10 transition-colors duration-300 dark:bg-[#0f0e1d]">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-xl shadow-violet-900/5 transition-colors duration-300 dark:border-gray-700 dark:bg-[#17152f] dark:shadow-black/20 sm:px-12"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 transition-colors duration-300 dark:bg-violet-500/20"
        >
          <CalendarDays className="h-12 w-12 text-violet-600 dark:text-violet-400" />
        </motion.div>

        {/* Brand */}
        <div className="mb-3 flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-violet-500 dark:text-violet-400" />

          <span className="text-sm font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            EventHub
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-extrabold text-slate-800 transition-colors duration-300 dark:text-white sm:text-3xl">
          No Events Available!
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-slate-500 transition-colors duration-300 dark:text-gray-400 sm:text-base">
          There are no events available right now.
          Start something amazing by creating your first event
          and bring people together!
        </p>

        {/* Button */}
        <Link href={isPath} className="mt-8 inline-block">
          <Button className="h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 text-base font-semibold text-white shadow-lg shadow-violet-500/20 hover:from-violet-700 hover:to-indigo-700">
            <Plus className="mr-2 h-5 w-5" />

            {usePath === "/events/joined-events"
              ? "Join Events"
              : "Create New Event"}
          </Button>
        </Link>

        {/* Footer */}
        <p className="mt-8 text-xs text-slate-400 dark:text-gray-500">
          Made with care by EventHub ❤️
        </p>
      </motion.div>
    </div>
  );
}

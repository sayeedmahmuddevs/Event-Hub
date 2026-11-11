
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";

import {
  ArrowRight,
  Heart,
  Users,
  CalendarCheck,
  HandHeart,
  Globe2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const stats = [
  {
    number: "1,450+",
    label: "Active Volunteers",
    icon: Users,
  },
  {
    number: "180+",
    label: "Events Completed",
    icon: CalendarCheck,
  },
  {
    number: "24,000+",
    label: "Lives Impacted",
    icon: HandHeart,
  },
  {
    number: "100%",
    label: "Community Driven",
    icon: Globe2,
  },
];

const Hero = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section
      className={`relative isolate overflow-hidden px-4 py-10 transition-colors duration-300 sm:py-10 lg:py-10 ${
        isDark
          ? "bg-[#0f0d20]"
          : "bg-gradient-to-b from-blue-50 via-white to-white"
      }`}
    >
      {/* Background Decorations */}

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className={`absolute -left-32 -top-40 h-96 w-96 rounded-full blur-[100px] ${
            isDark ? "bg-violet-600/10" : "bg-blue-200/40"
          }`}
        />

        <div
          className={`absolute -right-32 top-20 h-96 w-96 rounded-full blur-[110px] ${
            isDark ? "bg-indigo-600/10" : "bg-sky-200/40"
          }`}
        />

        <div
          className={`absolute -bottom-40 left-1/3 h-96 w-96 rounded-full blur-[100px] ${
            isDark ? "bg-purple-600/10" : "bg-indigo-100/70"
          }`}
        />
      </div>

      <div className="mx-auto max-w-7xl">

        {/* Hero Content */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >

          {/* Badge */}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <Badge
              variant="outline"
              className={`gap-2 rounded-full px-5 py-2 text-sm font-semibold shadow-sm ${
                isDark
                  ? "border-violet-500/30 bg-[#17152f] text-violet-300"
                  : "border-blue-200 bg-white text-blue-700"
              }`}
            >
              <Sparkles
                size={16}
                className={isDark ? "text-violet-400" : "text-blue-500"}
              />

              Community-Driven Social Impact Platform

              <span className={`h-2 w-2 animate-pulse rounded-full ${
                isDark ? "bg-violet-400" : "bg-blue-500"
              }`} />
            </Badge>
          </motion.div>

          {/* Heading */}

          <h1
            className={`text-2xl font-black leading-[1.15] tracking-tight sm:text-5xl md:text-6xl lg:text-5xl ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Small Acts,

            <span className={isDark ? "text-violet-400" : "text-blue-600"}>
              {" "}Big Impact.
            </span>

            <span className={`mt-3 block bg-clip-text text-transparent ${
              isDark
                ? "bg-gradient-to-r from-violet-400 via-sky-400 to-indigo-400"
                : "bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600"
            }`}>
              {"Let's"} Make a Difference Together.
            </span>
          </h1>

          {/* Description */}

          <p
            className={`mx-auto mt-7 max-w-2xl text-base leading-8 sm:text-lg ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Create, discover, and join community-driven events.
            From winter clothing and blanket donations to food
            distribution and social initiatives, every helping
            hand makes a difference.
          </p>

          {/* Action Buttons */}

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <Button
              size="lg"
              className={`group h-13 rounded-xl px-8 text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                isDark
                  ? "bg-violet-600 shadow-violet-600/20 hover:bg-violet-700"
                  : "bg-blue-600 shadow-blue-600/25 hover:bg-blue-700"
              }`}
            >
              <Link href="/events" className="flex items-center">
                Explore Events

                <ArrowRight
                  size={20}
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className={`group h-13 rounded-xl px-8 text-base font-bold transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? "border-violet-500/40 bg-[#17152f] text-gray-200 hover:border-violet-400 hover:bg-violet-500/10 hover:text-white"
                  : "border-blue-200 bg-white text-gray-800 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              <Link href="/events/create" className="flex items-center">
                <Heart
                  size={19}
                  className={`mr-2 transition-transform duration-300 group-hover:scale-125 ${
                    isDark ? "text-violet-400" : "text-blue-600"
                  }`}
                />

                Create an Event
              </Link>
            </Button>

          </div>

          {/* Trust Message */}

          <div className={`mt-9 flex flex-wrap items-center justify-center gap-2 text-sm ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}>
            <Users
              size={17}
              className={isDark ? "text-violet-400" : "text-blue-600"}
            />

            <span>
              Join thousands of people making a positive impact.
            </span>
          </div>

        </motion.div>

        {/* Statistics Cards */}

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">

          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + index * 0.12,
                }}
                whileHover={{ y: -7 }}
              >
                <Card
                  className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl ${
                    isDark
                      ? "border-slate-800 bg-[#17152f]/90 shadow-black/20 hover:border-violet-500/30 hover:shadow-violet-900/10"
                      : "border-blue-100 bg-white/80 shadow-sm backdrop-blur-lg hover:shadow-blue-900/5"
                  }`}
                >

                  {/* Card Decoration */}

                  <div
                    className={`absolute -right-8 -top-8 h-24 w-24 rounded-full transition-transform duration-500 group-hover:scale-150 ${
                      isDark ? "bg-violet-500/5" : "bg-blue-50"
                    }`}
                  />

                  <CardContent className="relative flex flex-col items-center p-5 text-center sm:p-7">

                    {/* Icon */}

                    <div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:text-white ${
                        isDark
                          ? "bg-violet-500/15 text-violet-400 group-hover:bg-violet-600"
                          : "bg-blue-100 text-blue-600 group-hover:bg-blue-600"
                      }`}
                    >
                      <Icon size={23} />
                    </div>

                    {/* Number */}

                    <h3
                      className={`text-2xl font-black tracking-tight sm:text-3xl ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {stat.number}
                    </h3>

                    {/* Label */}

                    <p
                      className={`mt-2 text-xs font-semibold sm:text-sm ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {stat.label}
                    </p>

                  </CardContent>
                </Card>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default Hero;

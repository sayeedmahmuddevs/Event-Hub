
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white px-4 py-10 sm:py-10 lg:py-10">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-40 h-96 w-96 rounded-full bg-emerald-200/40 blur-[100px]" />

        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-teal-200/40 blur-[110px]" />

        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-green-100/70 blur-[100px]" />
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
              className="gap-2 rounded-full border-emerald-200 bg-white px-5 py-2 text-sm font-semibold text-emerald-700 shadow-sm"
            >
              <Sparkles size={16} className="text-emerald-500" />

              Community-Driven Social Impact Platform

              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            </Badge>
          </motion.div>

          {/* Heading */}
          <h1 className="text-2xl font-black leading-[1.15] tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl">
            Small Acts,
            <span className="text-emerald-600">
              {" "}Big Impact.
            </span>

            <span className="mt-3 block bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600 bg-clip-text text-transparent">
              {"Let's"} Make a Difference Together.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
            Create, discover, and join community-driven events.
            From winter clothing and blanket donations to food
            distribution and social initiatives, every helping
            hand makes a difference.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <Button
              size="lg"
              className="group h-13 rounded-xl bg-emerald-600 px-8 text-base font-bold text-white shadow-lg shadow-emerald-600/25 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-xl"
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
              className="group h-13 rounded-xl border-emerald-200 bg-white px-8 text-base font-bold text-gray-800 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <Link href="/events/create" className="flex items-center">
                <Heart
                  size={19}
                  className="mr-2 text-emerald-600 transition-transform duration-300 group-hover:scale-125"
                />

                Create an Event
              </Link>
            </Button>

          </div>

          {/* Trust Message */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500">
            <Users size={17} className="text-emerald-600" />

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
                <Card className="group relative overflow-hidden rounded-2xl border-emerald-100 bg-white/80 shadow-sm backdrop-blur-lg transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5">

                  {/* Card Decoration */}
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-50 transition-transform duration-500 group-hover:scale-150" />

                  <CardContent className="relative flex flex-col items-center p-5 text-center sm:p-7">

                    {/* Icon */}
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                      <Icon size={23} />
                    </div>

                    {/* Number */}
                    <h3 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
                      {stat.number}
                    </h3>

                    {/* Label */}
                    <p className="mt-2 text-xs font-semibold text-gray-500 sm:text-sm">
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

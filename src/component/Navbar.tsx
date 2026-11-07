
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Menu,
  X,
  CalendarDays,
  History,
  LogIn,
  UserPlus
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    {
      name: "Upcoming Events",
      href: "/events",
      icon: CalendarDays,
    },
    {
      name: "Past Events",
      href: "/past-events",
      icon: History,
    },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full border-b border-blue-100/80 bg-white/90 shadow-sm backdrop-blur-xl">

        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* LOGO */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2"
          >
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-blue-600 shadow-md shadow-blue-600/20 transition-transform duration-300 group-hover:scale-105">

              <Image
                src="/logo.png"
                alt="Event Hub Logo"
                width={48}
                height={48}
                className="h-full w-full object-contain"
                priority
              />

            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight text-gray-900 sm:text-2xl">
                Event<span className="text-blue-600">Hub</span>
              </h1>

              <p className="text-[10px] font-medium tracking-widest text-gray-500">
                MAKE EVERY MOMENT MATTER
              </p>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-2 md:flex">

            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 transition-all duration-300 hover:bg-blue-50 hover:text-blue-700"
                >
                  <Icon
                    size={18}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />

                  {link.name}
                </Link>
              );
            })}

          </div>

          {/* DESKTOP AUTH BUTTONS */}
          <div className="hidden items-center gap-3 md:flex">

            <Button
              
              variant="ghost"
              className="rounded-xl font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-700"
            >
              <Link href="/sign-in">
                <LogIn size={17} className="mr-2" />
                Login
              </Link>
            </Button>

            <Button
              
              className="rounded-xl bg-blue-600 px-5 font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
            >
              <Link href="/sign-up">
                <UserPlus size={17} className="mr-2" />
                Sign Up
              </Link>
            </Button>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 text-gray-700 transition-colors hover:bg-blue-50 md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={23} /> : <Menu size={23} />}
          </button>

        </nav>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="border-t border-blue-100 bg-white px-4 py-5 shadow-lg md:hidden">

            <div className="mx-auto max-w-7xl space-y-2">

              {navLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Icon size={19} />
                    {link.name}
                  </Link>
                );
              })}

              <div className="my-3 border-t border-gray-100" />

              <Button
                
                variant="outline"
                className="h-11 w-full rounded-xl border-blue-200"
              >
                <Link
                  href="/sign-in"
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center"
                >
                  <LogIn size={18} className="mr-2" />
                  Login
                </Link>
              </Button>

              <Button
                className="inline-block p-4 w-full rounded-xl bg-blue-600 hover:bg-blue-700"
              >
                <Link
                  href="/sign-up"
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center"
                >
                  <UserPlus size={18} />
                  <span>Sign Up</span> 
                </Link>
              </Button>

            </div>
          </div>
        )}

      </header>
    </>
  );
}

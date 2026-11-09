
"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import {
  Menu,
  X,
  CalendarDays,
  History,
  LogIn,
  UserPlus,
  Moon,
  Sun,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

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

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;

    if (isActive) {
      return isDark
        ? "bg-blue-900/50 text-blue-300"
        : "bg-blue-50 text-blue-700";
    }

    return isDark
      ? "text-gray-300 hover:bg-gray-800 hover:text-blue-400"
      : "text-gray-600 hover:bg-blue-50 hover:text-blue-700";
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full border-b shadow-sm backdrop-blur-xl transition-colors duration-300 ${
        isDark
          ? "border-gray-700 bg-gray-950/95 text-white"
          : "border-blue-100/80 bg-white/95 text-gray-900"
      }`}
    >
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
            <h1
              className={`text-xl font-black tracking-tight sm:text-2xl ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Event<span className="text-blue-600">Hub</span>
            </h1>

            <p
              className={`text-[10px] font-medium tracking-widest ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
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
                className={`group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${getLinkClass(link.href)}`}
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
            className={`rounded-xl font-semibold ${
              isDark
                ? "text-gray-200 hover:bg-gray-800 hover:text-white"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
            }`}            
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

        {/* THEME TOGGLE */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          disabled={!mounted}
          className={`h-10 w-10 shrink-0 rounded-xl transition-all duration-300 ${
            isDark
              ? "text-yellow-400 hover:bg-gray-800"
              : "text-blue-700 hover:bg-blue-50"
          }`}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={21} /> : <Moon size={21} />}
        </Button>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors md:hidden ${
            isDark
              ? "border-gray-700 text-white hover:bg-gray-800"
              : "border-blue-100 text-gray-700 hover:bg-blue-50"
          }`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {isOpen && (
        <div
          className={`border-t px-4 py-5 shadow-lg md:hidden ${
            isDark
              ? "border-gray-700 bg-gray-950 text-white"
              : "border-blue-100 bg-white text-gray-900"
          }`}
        >
          <div className="mx-auto max-w-7xl space-y-2">

            {/* MOBILE NAV LINKS */}
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition-colors ${getLinkClass(link.href)}`}
                >
                  <Icon size={19} />
                  {link.name}
                </Link>
              );
            })}

            <div
              className={`my-3 border-t ${
                isDark ? "border-gray-700" : "border-gray-100"
              }`}
            />

            {/* MOBILE LOGIN */}
            <Button
              variant="outline"
              className={`h-11 w-full rounded-xl ${
                isDark
                  ? "border-gray-700 bg-gray-900 text-white hover:bg-gray-800"
                  : "border-blue-200 text-gray-700"
              }`}              
            >
              <Link
                href="/sign-in"
                onClick={() => setIsOpen(false)}
              >
                <LogIn size={18} className="mr-2" />
                Login
              </Link>
            </Button>

            {/* MOBILE SIGN UP */}
            <Button
              className="h-11 w-full rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              <Link
                href="/sign-up"
                onClick={() => setIsOpen(false)}
              >
                <UserPlus size={18} className="mr-2" />
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
